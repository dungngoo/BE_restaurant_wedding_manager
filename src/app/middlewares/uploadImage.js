

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