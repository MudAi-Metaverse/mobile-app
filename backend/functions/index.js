const { initializeApp, cert } = require("firebase-admin/app");
const { onRequest } = require("firebase-functions/v2/https");
const { onCall } = require("firebase-functions/v2/https");
const {
  onValueDeleted,
  onValueWritten,
} = require("firebase-functions/v2/database");
const functions = require("firebase-functions");

const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

var serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "mudai-dev.appspot.com",
});

const { setGlobalOptions } = require("firebase-functions/v2/options");
setGlobalOptions({
  region: "asia-northeast1",
  memory: "128MiB",
});

exports.event = require("./event");
exports.storage = require("./storage");

exports.notification_add_chat_asia = onCall((request) => {
  const { notification, tokens, data, additionalInfo } = request.data;

  logger.log(notification);

  admin.messaging().sendEachForMulticast({
    tokens,
    notification,
    data,
    apns: {
      payload: {
        aps: {
          alert: {
            subtitle: additionalInfo?.subtitle,
          },
          sound: "default",
          contentAvailable: true,
          mutableContent: 1,
        },
      },
      fcm_options: {
        image: notification.image,
      },
    },
    android: {
      notification: {
        notification_priority: "PRIORITY_HIGH",
      },
    },
  });

  return request.data;
});
