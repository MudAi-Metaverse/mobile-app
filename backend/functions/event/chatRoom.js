const {
  onValueDeleted,
  onValueWritten,
} = require("firebase-functions/v2/database");
const {
  log,
  info,
  debug,
  warn,
  error,
  write,
} = require("firebase-functions/logger");
const admin = require("firebase-admin");

exports.onDelete = onValueDeleted(
  {
    ref: `chatRoom/{roomId}`,
    region: "asia-southeast1",
  },
  (e) => {
    log("onDelete", e.params.roomId);
    const bucket = admin.storage().bucket();

    bucket.deleteFiles({
      //ここでフォルダのパスを指定します
      prefix: `chat/${e.params.roomId}/`,
    });
  }
);
