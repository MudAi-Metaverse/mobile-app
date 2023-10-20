const { onRequest } = require("firebase-functions/v2/https");
const { onCall } = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const { getStorage, getDownloadURL } = require("firebase-admin/storage");
const { onObjectFinalized } = require("firebase-functions/v2/storage");

const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

const fs = require("fs");
const os = require("os");
const path = require("path");
const process = require("child_process");
const { mkdirp } = require("mkdirp");

const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffmpeg = require("fluent-ffmpeg");
const ffprobe = require("ffprobe-static");

const TARGET_MIME_TYPE = "video/";
const STORAGE_TARGET_DIR = "chat/";

function validateObject(object, uploadedPath) {
  const filePath = uploadedPath || "";
  const fileDir = path.dirname(filePath);
  if (uploadedPath === undefined) {
    console.log(fileDir, " is not uploaded from app.");
    return false;
  }
  // Validate directory path.
  if (!fileDir.match(STORAGE_TARGET_DIR)) {
    console.log(fileDir, " is not a target directory.");
    return false;
  }
  // Validate MIME type.
  if (!object.mime.match(TARGET_MIME_TYPE)) {
    console.log("This is not a video.", object.mime);
    return false;
  }
  return true;
}

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobe.path);

function generateThumbnail(inputFile, outputFile) {
  const outputDir = path.dirname(outputFile);
  const outputFileName = path.basename(outputFile);

  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .on("end", function () {
        resolve();
      })
      .screenshots({
        timestamps: [1],
        filename: outputFileName,
        folder: outputDir,
      });
  });
}

exports.create_poster = onCall(
  {
    memory: "1GiB",
  },
  async (request) => {
    const { uploadedPath, mediaObj } = request.data;
    const bucket = getStorage().bucket();

    if (!validateObject(mediaObj, uploadedPath)) {
      return Promise.resolve(null);
    }

    const filePath = uploadedPath || "";
    const fileName = path.basename(filePath);
    const thumbnailPath = path.normalize(
      path.join(filePath.replace("media", "poster"), fileName + ".jpg")
    );

    const tmpPath = path.join(os.tmpdir(), filePath);
    const tmpDir = path.dirname(tmpPath);
    const tmpThumbnailPath = path.join(os.tmpdir(), thumbnailPath);
    const tmpThumbnailDir = path.dirname(tmpThumbnailPath);

    await mkdirp(tmpDir);
    await mkdirp(tmpThumbnailDir);

    await bucket.file(filePath).download({ destination: tmpPath });
    // console.log("The file has been downloaded to", tmpPath);

    await generateThumbnail(tmpPath, tmpThumbnailPath);
    // console.log("Thumbnail created at", tmpThumbnailPath);

    // Uploading the Thumbnail.
    await bucket.upload(tmpThumbnailPath, {
      destination: thumbnailPath,
      metadata: { contentType: "image/jpeg" },
    });

    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(tmpPath);
    fs.unlinkSync(tmpThumbnailPath);

    // Get the Signed URLs for the video and thumbnail.
    // getDownloadURLはpermissionが通らなかったので、getSignedUrlに変更
    const downloadURL = await bucket.file(thumbnailPath).getSignedUrl({
      action: "read",
      expires: "12-31-3020", //1000年後に設定
    });
    // console.log("Got Signed URLs.", downloadURL);

    return Promise.resolve(downloadURL[0]);
  }
);
