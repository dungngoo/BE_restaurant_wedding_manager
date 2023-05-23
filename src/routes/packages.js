const express = require("express");
const router = express.Router();

const PackageController = require("../app/controllers/PackageController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Package:
 *       type: object
 *       required:
 *         - packageName
 *         - services
 *         - description
 *         - price
 *         - imgs
 *       properties:
 *         packageName:
 *           type: string
 *           description: Tên gói dịch vụ
 *         services:
 *           type: array
 *           items:
 *             type: string
 *             description: ID của dịch vụ
 *           description: Danh sách các dịch vụ trong gói
 *         description:
 *           type: string
 *           description: Mô tả về gói dịch vụ
 *         price:
 *           type: number
 *           description: Giá của gói dịch vụ
 *         imgs:
 *           type: array
 *           items:
 *             type: string
 *             description: Đường dẫn đến hình ảnh
 *           description: Danh sách các đường dẫn hình ảnh
 */

/**
 * @swagger
 * /packages/{packageName}:
 *   get:
 *     tags:
 *       - Packages
 *     summary: Lấy thông tin gói dịch vụ theo tên
 *     description: Lấy thông tin chi tiết về gói dịch vụ dựa trên tên gói
 *     parameters:
 *       - name: packageName
 *         in: path
 *         description: Tên gói dịch vụ
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công. Trả về thông tin chi tiết về gói dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       '404':
 *         description: Gói dịch vụ không tồn tại.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 *       '500':
 *         description: Lỗi server. Không thể lấy thông tin gói dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/:packageName", PackageController.getPackageByName);
/**
 * @swagger
 * /packages:
 *   get:
 *     tags:
 *       - Packages
 *     summary: Lấy danh sách gói dịch vụ
 *     description: Lấy danh sách tất cả các gói dịch vụ
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách các gói dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách gói dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/", PackageController.getAll);

module.exports = router;
