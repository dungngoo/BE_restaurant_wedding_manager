// const AWS = require("aws-sdk");
// const fs = require("fs");

// AWS.config.update({
//   accessKeyId: "AKIATQZP6D7EHQ7X63P4",
//   secretAccessKey: "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",
// });

// const s3 = new AWS.S3();

// function uploadFileToS3(pathFile, file, callback) {
//   //   const fileBuffer = Buffer.from(file);
//   const fileContent = fs.readFileSync(file.path);
//   const params = {
//     Bucket: "website-restaurant",
//     Key: `${pathFile}/${file.originalname}`,
//     Body: fileContent,
//     ACL: "public-read",
//   };

//   s3.upload(params, function (err, data) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, data.Location);
//     }
//   });
// }

// module.exports = uploadFileToS3;


const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  // Định nghĩa thư mục lưu trữ ảnh
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  // Định nghĩa tên và định dạng ảnh
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = { upload};