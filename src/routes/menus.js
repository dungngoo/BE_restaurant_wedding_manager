const express = require("express");
const router = express.Router();

const MenuController = require("../app/controllers/MenuController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 255
 *           description: Tên menu
 *         description:
 *           type: string
 *           description: Mô tả menu
 *         items:
 *           type: array
 *           items:
 *             type: string
 *             description: ID của mục menu liên quan
 *         available:
 *           type: boolean
 *           default: true
 *           description: Trạng thái menu có sẵn hay không
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Ngày tạo menu
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Ngày cập nhật menu
 */
/**
 * @swagger
 * /menus/create:
 *   post:
 *     tags:
 *       - Menus
 *     summary: Tạo mới một menu
 *     description: Tạo mới một menu và lưu các món ăn vào menu đó
 *     responses:
 *       '200':
 *         description: Thành công. Menu đã được tạo thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       '500':
 *         description: Lỗi server. Không thể tạo menu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/create", MenuController.createMenu);
/**
 * @swagger
 * /menus/type}:
 *   get:
 *     tags:
 *       - Menus
 *     summary: Lấy danh sách món chính theo loại
 *     description: Lấy danh sách các món chính dựa trên loại được chỉ định
 *     parameters:
 *       - name: type
 *         in: path
 *         description: Loại món chính
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách món chính theo loại.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách món chính.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/:type", MenuController.getMainDishesMenu);
/**
 * @swagger
 * /menus/:
 *   get:
 *     tags:
 *       - Menus
 *     summary: Lấy danh sách menu
 *     description: Lấy danh sách tất cả các menu
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Số lượng menu tối đa trên mỗi trang
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
 *         description: Thành công. Trả về danh sách các menu.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách menu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/", MenuController.getAll);

module.exports = router;
