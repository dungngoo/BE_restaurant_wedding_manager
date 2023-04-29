const express = require("express");
const router = express.Router();

const LobbiesController = require("../app/controllers/LobbiesController");
// LobbiesController.getLobbyByName ---  Lấy sảnh theo tên sảnh
router.use("/:constant", LobbiesController.getLobbyByConstant);
// LobbiesController.getAll ---  Lấy tất cả món ăn
router.use("/", LobbiesController.getAll);

module.exports = router;
