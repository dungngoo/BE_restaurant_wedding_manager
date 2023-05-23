const express = require("express");
const router = express.Router();

const ServiceController = require("../app/controllers/serviceController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - serviceName
 *         - serviceTypeId
 *         - description
 *         - price
 *         - imgs
 *       properties:
 *         serviceName:
 *           type: string
 *           description: Tên dịch vụ
 *         serviceTypeId:
 *           type: array
 *           items:
 *             type: string
 *           description: Mảng chứa ID của các loại dịch vụ liên quan
 *         description:
 *           type: array
 *           items:
 *             type: string
 *           description: Mô tả dịch vụ
 *         price:
 *           type: number
 *           description: Giá dịch vụ
 *         imgs:
 *           type: array
 *           items:
 *             type: string
 *           description: Mảng chứa đường dẫn ảnh của dịch vụ
 *         param:
 *           type: string
 *           description: Tham số khác của dịch vụ
 */
//  ---  Lấy dịch vụ theo loại dịch vụ
/**
 * @swagger
 * /services/{type}:
 *   get:
 *     tags:
 *       - Services
 *     summary: Lấy danh sách dịch vụ theo loại
 *     description: Lấy danh sách các dịch vụ dựa trên loại (type)
 *     parameters:
 *       - name: type
 *         in: path
 *         description: Loại dịch vụ
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách các dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       '404':
 *         description: Không tìm thấy dịch vụ với loại cung cấp.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/:type", ServiceController.getServiceByType);
//  ---  Lấy tất cả các dịch vụ
/**
 * @swagger
 * /services:
 *   get:
 *     tags:
 *       - Services
 *     summary: Lấy danh sách dịch vụ
 *     description: Lấy danh sách tất cả các dịch vụ
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Số lượng dịch vụ tối đa trên mỗi trang
 *         required: false
 *         schema:
 *           type: integer
 *       - name: page
 *         in: query
 *         description: Số trang hiện tại
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách các dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/", ServiceController.getAll);

module.exports = router;
