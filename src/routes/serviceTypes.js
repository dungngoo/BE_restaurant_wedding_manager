const express = require("express");
const router = express.Router();

const ServiceTypeController = require("../app/controllers/ServiceTypeController");
//  ---  Lấy dịch vụ theo loại dịch vụ
router.use("/type", ServiceTypeController.getServiceTypes);
//  ---  Lấy tất cả các dịch vụ
router.use("/", ServiceTypeController.getAll);

module.exports = router;
