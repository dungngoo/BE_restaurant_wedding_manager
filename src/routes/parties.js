const express = require("express");
const router = express.Router();

const partyController = require("../app/controllers/partyController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Party:
 *       type: object
 *       required:
 *         - eventDate
 *         - tableQuantity
 *         - serviceTypeId
 *         - lobbyId
 *         - customerId
 *       properties:
 *         eventDate:
 *           type: string
 *           format: date-time
 *           description: Ngày diễn ra sự kiện
 *         startTime:
 *           type: string
 *           format: time
 *           description: Thời gian bắt đầu sự kiện
 *         endTime:
 *           type: string
 *           format: time
 *           description: Thời gian kết thúc sự kiện
 *         tableQuantity:
 *           type: number
 *           description: Số lượng bàn đặt trong sự kiện
 *         menuId:
 *           type: string
 *           description: ID của menu được chọn cho sự kiện
 *         serviceTypeId:
 *           type: string
 *           description: ID của loại dịch vụ trong sự kiện
 *         services:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 description: ID của dịch vụ
 *           description: Danh sách các dịch vụ trong sự kiện
 *         lobbyId:
 *           type: string
 *           description: ID của lobby được chọn cho sự kiện
 *         customerId:
 *           type: string
 *           description: ID của khách hàng đặt sự kiện
 */
/**
 * @swagger
 * /parties:
 *   get:
 *     tags:
 *       - Parties
 *     summary: Lấy danh sách tiệc
 *     description: Lấy danh sách tất cả các tiệc
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Số lượng tiệc tối đa trên mỗi trang
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
 *         description: Thành công. Trả về danh sách các tiệc.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Party'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách tiệc.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/", partyController.index);

module.exports = router;
