const express = require("express");
const router = express.Router();

const EventController = require("../app/controllers/EventController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - date
 *         - location
 *         - type
 *         - param
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 255
 *           description: Tên sự kiện
 *         description:
 *           type: string
 *           maxLength: 2000
 *           description: Mô tả sự kiện
 *         date:
 *           type: string
 *           format: date-time
 *           description: Ngày diễn ra sự kiện
 *         location:
 *           type: string
 *           maxLength: 255
 *           description: Địa điểm tổ chức sự kiện
 *         type:
 *           type: string
 *           enum:
 *             - Sự kiện cưới
 *             - Sự kiện công ty
 *             - Sự kiện cá nhân khác
 *           description: Loại sự kiện
 *         imgs:
 *           type: array
 *           items:
 *             type: string
 *             maxLength: 255
 *           description: Danh sách hình ảnh liên quan đến sự kiện
 *         param:
 *           type: string
 *           maxLength: 255
 *           description: Tham số sự kiện
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Ngày tạo sự kiện
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Ngày cập nhật sự kiện
 */

/**
 * @swagger
 * /events/name/{name}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Lấy thông tin sự kiện theo tên
 *     description: Lấy thông tin chi tiết của sự kiện dựa trên tên sự kiện
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Tên sự kiện
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công. Trả về thông tin sự kiện.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Lỗi server. Không thể lấy thông tin sự kiện.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/name/:name", EventController.getEventByName);
/**
 * @swagger
 * /events/{param}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Lấy danh sách sự kiện theo tham số
 *     description: Lấy danh sách các sự kiện dựa trên một tham số cụ thể
 *     parameters:
 *       - name: param
 *         in: path
 *         required: true
 *         description: Tham số
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách các sự kiện.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách sự kiện.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/:param", EventController.getEventsByParam);
/**
 * @swagger
 * /events/:
 *   get:
 *     tags:
 *       - Events
 *     summary: Lấy danh sách tất cả sự kiện
 *     description: Lấy danh sách tất cả các sự kiện có trong hệ thống
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách các sự kiện.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách sự kiện.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/", EventController.getAll);

module.exports = router;
