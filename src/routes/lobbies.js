const express = require("express");
const router = express.Router();

const LobbiesController = require("../app/controllers/LobbiesController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Lobby:
 *       type: object
 *       required:
 *         - name
 *         - capacity
 *         - constant
 *         - price
 *         - imgs
 *       properties:
 *         name:
 *           type: string
 *           description: Tên phòng
 *         capacity:
 *           type: number
 *           description: Sức chứa của phòng
 *         description:
 *           type: string
 *           description: Mô tả phòng
 *         constant:
 *           type: string
 *           unique: true
 *           description: Mã định danh duy nhất cho phòng
 *         price:
 *           type: number
 *           description: Giá phòng
 *         imgs:
 *           type: array
 *           items:
 *             type: string
 *             description: Đường dẫn ảnh của phòng
 *         status:
 *           type: string
 *           enum:
 *             - available
 *             - unavailable
 *           default: available
 *           description: Trạng thái phòng
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Ngày tạo phòng
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Ngày cập nhật phòng
 */

// LobbiesController.getLobbyByName ---  Lấy sảnh theo tên sảnh
/**
 * @swagger
 * /lobbies/{constant}:
 *   get:
 *     tags:
 *       - Lobbies
 *     summary: Lấy thông tin sảnh theo hằng số
 *     description: Lấy thông tin sảnh theo hằng số
 *     parameters:
 *       - name: constant
 *         in: path
 *         description: Hằng số của phòng
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công. Trả về thông tin phòng.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lobby'
 *       '404':
 *         description: Phòng không tồn tại.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi.
 *       '500':
 *         description: Lỗi server. Không thể lấy thông tin phòng.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/:constant", LobbiesController.getLobbyByConstant);
// LobbiesController.getAll ---  Lấy tất cả món ăn
/**
 * @swagger
 * /lobbies/:
 *   get:
 *     tags:
 *       - Lobbies
 *     summary: Lấy danh sách phòng
 *     description: Lấy danh sách tất cả các phòng
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Số lượng phòng tối đa trên mỗi trang
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
 *         description: Thành công. Trả về danh sách các phòng.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lobby'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách phòng.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/", LobbiesController.getAll);

module.exports = router;
