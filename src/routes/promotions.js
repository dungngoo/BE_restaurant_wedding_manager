const express = require("express");
const router = express.Router();

const promotionsController = require("../app/controllers/PromotionsController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Promotion:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - startDate
 *         - endDate
 *         - image
 *         - serviceTypeId
 *         - param
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 255
 *           description: Tên khuyến mãi
 *         description:
 *           type: string
 *           maxLength: 2000
 *           description: Mô tả khuyến mãi
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Ngày bắt đầu khuyến mãi
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: Ngày kết thúc khuyến mãi
 *         image:
 *           type: string
 *           description: Đường dẫn ảnh của khuyến mãi
 *         serviceTypeId:
 *           type: string
 *           description: ID của loại dịch vụ liên quan đến khuyến mãi
 *         param:
 *           type: string
 *           description: Tham số khác của khuyến mãi
 */
/**
 * @swagger
 * /promotions/type/:
 *   get:
 *     tags:
 *       - Promotions
 *     summary: Lấy danh sách khuyến mãi theo loại dịch vụ
 *     description: Lấy danh sách các khuyến mãi dựa trên loại dịch vụ (ServiceType)
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách các khuyến mãi.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promotion'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách khuyến mãi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/type/", promotionsController.getPromotionByServiceType);
/**
 * @swagger
 * /promotions/{param}:
 *   get:
 *     tags:
 *       - Promotions
 *     summary: Lấy thông tin khuyến mãi theo tham số
 *     description: Lấy thông tin về một khuyến mãi dựa trên tham số (param)
 *     parameters:
 *       - name: param
 *         in: path
 *         description: Tham số để tìm kiếm khuyến mãi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công. Trả về thông tin khuyến mãi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *       '404':
 *         description: Không tìm thấy khuyến mãi với tham số cung cấp.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 *       '500':
 *         description: Lỗi server. Không thể lấy thông tin khuyến mãi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/:param", promotionsController.getPromotionByParam);
/**
 * @swagger
 * /promotions:
 *   get:
 *     tags:
 *       - Promotions
 *     summary: Lấy danh sách khuyến mãi
 *     description: Lấy danh sách tất cả các khuyến mãi
 *     parameters:
 *       - name: _limit
 *         in: query
 *         description: Số lượng khuyến mãi tối đa trả về
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách các khuyến mãi.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promotion'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách khuyến mãi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/", promotionsController.getAll);

module.exports = router;
