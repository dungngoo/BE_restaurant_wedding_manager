const express = require("express");
const router = express.Router();

const ServiceController = require("../app/controllers/serviceController");
//  ---  Lấy dịch vụ theo loại dịch vụ
router.use("/:type", ServiceController.getServiceByType);
//  ---  Lấy tất cả các dịch vụ
router.use("/", ServiceController.getAll);

module.exports = router;
