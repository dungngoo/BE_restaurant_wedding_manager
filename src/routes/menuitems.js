const express = require("express");
const router = express.Router();

const MenuItemController = require("../app/controllers/MenuItemController");
/**
 * @swagger
 * /menuitems/type:
 *   get:
 *     tags:
 *       - MenuItems
 *     summary: Lấy danh sách món ăn theo danh mục
 *     description: Lấy danh sách món ăn được nhóm theo danh mục
 *     parameters:
 *       - name: _page
 *         in: query
 *         description: Số trang hiện tại
 *         required: false
 *         schema:
 *           type: integer
 *       - name: _limit
 *         in: query
 *         description: Số lượng món ăn tối đa trên mỗi trang
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách món ăn theo danh mục.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách món ăn.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/type", MenuItemController.getMenuItemsByCategory);
/**
 * @swagger
 * /menuitems/search:
 *   get:
 *     tags:
 *       - MenuItems
 *     summary: Tìm kiếm danh mục món ăn
 *     description: Tìm kiếm danh mục món ăn dựa trên từ khóa
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Từ khóa tìm kiếm
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công. Trả về kết quả tìm kiếm.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       '500':
 *         description: Lỗi server. Không thể tìm kiếm danh mục món ăn.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/search", MenuItemController.searchMenuCategories);
/**
 * @swagger
 * /menuitems/{type}:
 *   get:
 *     tags:
 *       - MenuItems
 *     summary: Lấy danh sách món ăn theo danh mục
 *     description: Lấy danh sách món ăn theo danh mục
 *     parameters:
 *       - name: type
 *         in: path
 *         description: Loại danh mục món ăn
 *         required: true
 *         schema:
 *           type: string
 *       - name: _page
 *         in: query
 *         description: Số trang hiện tại
 *         required: false
 *         schema:
 *           type: integer
 *       - name: _limit
 *         in: query
 *         description: Số lượng món ăn tối đa trên mỗi trang
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách món ăn theo danh mục.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách món ăn.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/:type", MenuItemController.getMenuItemByType);
/**
 * @swagger
 * /menuitems/:
 *   get:
 *     tags: [MenuItems]
 *     summary: Lấy danh sách các mục menu
 *     responses:
 *       200:
 *         description: Thành công - Danh sách các mục menu
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       500:
 *         description: Lỗi máy chủ - Không thể lấy danh sách mục menu
 */
router.use("/", MenuItemController.getAll);

module.exports = router;
