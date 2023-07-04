const express = require("express");
const router = express.Router();

const customerController = require("d:/QuanLyNhaHangTiecCuoi/BE/src/app/controllers/customerController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Tên của khách hàng
 *         phone:
 *           type: string
 *           description: Số điện thoại của khách hàng
 *         email:
 *           type: string
 *           description: Địa chỉ email của khách hàng
 *         notes:
 *           type: array
 *           items:
 *             type: string
 *             description: Ghi chú về khách hàng
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Ngày tạo khách hàng
 */   

/**
 * @swagger
 * /customer/sendEmail:
 *   post:
 *     tags:
 *       - Customer
 *     summary: Gửi email và lưu thông tin liên hệ
 *     description: Gửi email và lưu thông tin liên hệ vào cơ sở dữ liệu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Email gửi thành công và thông tin liên hệ được lưu vào cơ sở dữ liệu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo thành công
 *       '400':
 *         description: email hoặc số điện thoại đã tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi
 *       '500':
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi
 */
router.use("/sendEmail", customerController.sendEmail);
/**
 * @swagger
 * /customer/:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Lấy danh sách khách hàng
 *     description: Lấy danh sách tất cả khách hàng từ cơ sở dữ liệu
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách khách hàng.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách khách hàng.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/", customerController.getAll);

module.exports = router;
