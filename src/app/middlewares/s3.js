const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");

const s3 = new aws.S3({
  accessKeyId: "AKIATQZP6D7EN4CVWT23",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: "website-restaurant",
    Key: `staff-images/${file.originalname}-${file.filename}`,
    Body: fileStream,
  };
  return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: "website-restaurant",
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;

function updateFile(fileKey, newFilePath) {
  return new Promise((resolve, reject) => {
    if (!newFilePath) {
      reject(new Error("File path is undefined"));
      return;
    }

    const fileStream = fs.createReadStream(newFilePath);
    const updateParams = {
      Bucket: "website-restaurant",
      Key: fileKey,
      Body: fileStream,
    };

    const uploadOptions = {
      partSize: 10 * 1024 * 1024, // 10MB part size
      queueSize: 1, // Number of parallel uploads
    };

    const upload = s3.upload(updateParams, uploadOptions);

    upload.on("httpUploadProgress", function (progress) {
      // Handle progress events if needed
    });

    upload.send(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

exports.updateFile = updateFile;
function deleteFile(fileKey) {
  const deleteParams = {
    Bucket: "website-restaurant",
    Key: fileKey,
  };
  return s3.deleteObject(deleteParams).promise();
}

exports.deleteFile = deleteFile;
