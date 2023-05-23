const express = require("express");
const router = express.Router();

const ServiceTypeController = require("../app/controllers/ServiceTypeController");
/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceType:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Tên loại dịch vụ
 *         description:
 *           type: array
 *           items:
 *             type: string
 *           description: Mô tả loại dịch vụ
 *         isActive:
 *           type: boolean
 *           description: Trạng thái hoạt động của loại dịch vụ
 *         imgs:
 *           type: array
 *           items:
 *             type: string
 *           description: Mảng chứa đường dẫn ảnh của loại dịch vụ
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Ngày tạo
 *         type:
 *           type: string
 *           description: Loại dịch vụ
 */
//  ---  Lấy dịch vụ theo loại dịch vụ
/**
 * @swagger
 * /serviceTypes/type:
 *   get:
 *     tags:
 *       - ServiceTypes
 *     summary: Lấy danh sách loại dịch vụ theo type đã chỉ định
 *     description: Lấy danh sách các loại dịch vụ đã chọn
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách các loại dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceType'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách loại dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/type", ServiceTypeController.getServiceTypes);
/**
 * @swagger
 * /serviceTypes/{name}:
 *   get:
 *     tags:
 *       - ServiceTypes
 *     summary: Lấy danh sách dịch vụ theo tên
 *     description: Lấy danh sách các dịch vụ có loại dịch vụ tương ứng với tên đã cho
 *     parameters:
 *       - name: name
 *         in: path
 *         description: Tên loại dịch vụ
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
 *                 $ref: '#/components/schemas/ServiceType'
 *       '404':
 *         description: Không tìm thấy dịch vụ. Trả về thông báo lỗi.
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

router.use("/:name", ServiceTypeController.getServiceByName);
//  ---  Lấy tất cả các dịch vụ
/**
 * @swagger
 * /serviceTypes:
 *   get:
 *     tags:
 *       - ServiceTypes
 *     summary: Lấy danh sách loại dịch vụ
 *     description: Lấy danh sách tất cả các loại dịch vụ
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách các loại dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceType'
 *       '500':
 *         description: Lỗi server. Không thể lấy danh sách loại dịch vụ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.use("/", ServiceTypeController.getAll);

module.exports = router;
