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
  console.log(file);
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: "website-restaurant",
    Key: `${file.fieldname}-${file.originalname}-${file.filename}`,
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
