const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/NewsController");
/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - image
 *       properties:
 *         news_id:
 *           type: string
 *           description: ID của tin tức
 *         title:
 *           type: string
 *           description: Tiêu đề tin tức
 *         content:
 *           type: string
 *           description: Nội dung tin tức
 *         image:
 *           type: string
 *           description: Đường dẫn đến hình ảnh tin tức
 */
/**
 * @swagger
 * /news/{id}:
 *   get:
 *     tags:
 *       - News
 *     summary: Lấy thông tin tin tức bằng ID
 *     description: Lấy thông tin chi tiết của một tin tức dựa trên ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của tin tức cần lấy thông tin
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công. Trả về thông tin chi tiết của tin tức.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       '500':
 *         description: Lỗi server. Không thể lấy thông tin tin tức.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/:id", newsController.getById);
/**
 * @swagger
 * /news:
 *   get:
 *     tags:
 *       - News
 *     summary: Lấy danh sách tin tức
 *     description: Lấy danh sách tất cả các tin tức
 *     parameters:
 *       - name: _page
 *         in: query
 *         description: Số trang hiện tại
 *         required: false
 *         schema:
 *           type: integer
 *       - name: _limit
 *         in: query
 *         description: Số lượng tin tức tối đa trên mỗi trang
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách tin tức.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/News'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     _page:
 *                       type: integer
 *                       description: Số trang hiện tại
 *                     _limit:
 *                       type: integer
 *                       description: Số lượng tin tức tối đa trên mỗi trang
 *                     _totalRows:
 *                       type: integer
 *                       description: Tổng số tin tức
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách tin tức.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/", newsController.index);
router.get("/", (req, res) => {
  const news = req.app.db.get("news");

  res.send(news);
});
module.exports = router;
