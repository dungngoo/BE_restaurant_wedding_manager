const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const staffController = require("../app/controllers/staffController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - phonenumber
 *       properties:
 *         staff_id:
 *           type: string
 *           description: ID nhân viên
 *         fullname:
 *           type: string
 *           maxLength: 60
 *           description: Họ và tên nhân viên
 *         email:
 *           type: string
 *           maxLength: 100
 *           description: Địa chỉ email của nhân viên
 *         address:
 *           type: string
 *           description: Địa chỉ nhân viên
 *         birth:
 *           type: string
 *           description: Ngày sinh của nhân viên
 *         birthPlace:
 *           type: string
 *           description: Nơi sinh của nhân viên
 *         date:
 *           type: string
 *           description: Ngày tháng năm
 *         dateOfPlace:
 *           type: string
 *           description: Địa chỉ nơi sinh
 *         phonenumber:
 *           type: string
 *           description: Số điện thoại của nhân viên
 *         identify:
 *           type: string
 *           maxLength: 25
 *           description: Số CMND/CCCD của nhân viên
 *         staffImg:
 *           type: string
 *           description: Đường dẫn ảnh đại diện của nhân viên
 *         sex:
 *           type: string
 *           description: Giới tính của nhân viên
 *         job_type:
 *           type: string
 *           description: Loại công việc của nhân viên
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Ngày tạo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Ngày cập nhật
 */
/**
 * @swagger
 * /staffs:
 *   post:
 *     tags:
 *       - Staffs
 *     summary: Tạo nhân viên mới
 *     description: Tạo một nhân viên mới và lưu vào cơ sở dữ liệu
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               staffImg:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               position:
 *                 type: string
 *             required:
 *               - staffImg
 *               - name
 *               - age
 *               - position
 *     responses:
 *       '200':
 *         description: Thành công. Nhân viên được tạo thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo thành công.
 *                 staff:
 *                   $ref: '#/components/schemas/Staff'
 *       '400':
 *         description: Yêu cầu không hợp lệ. Thiếu thông tin nhân viên hoặc hình ảnh nhân viên.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 *       '500':
 *         description: Lỗi server. Không thể tạo nhân viên.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.post("/", upload.single("staffImg"), staffController.create);
/**
 * @swagger
 * /staffs/{id}:
 *   put:
 *     tags:
 *       - Staffs
 *     summary: Cập nhật thông tin nhân viên
 *     description: Cập nhật thông tin của một nhân viên trong cơ sở dữ liệu
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của nhân viên cần cập nhật
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               staffImg:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               position:
 *                 type: string
 *               birth:
 *                 type: string
 *                 format: date
 *               date:
 *                 type: string
 *                 format: date
 *             required:
 *               - staffImg
 *               - name
 *               - age
 *               - position
 *               - birth
 *               - date
 *     responses:
 *       '200':
 *         description: Thành công. Nhân viên được cập nhật thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo thành công.
 *       '400':
 *         description: Yêu cầu không hợp lệ. Thiếu thông tin nhân viên hoặc hình ảnh nhân viên.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 *       '500':
 *         description: Lỗi server. Không thể cập nhật nhân viên.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.put("/:id", upload.single("staffImg"), staffController.update);
/**
 * @swagger
 * /staffs/delete-many:
 *   delete:
 *     tags:
 *       - Staffs
 *     summary: Xóa nhiều nhân viên
 *     description: Xóa nhiều nhân viên khỏi cơ sở dữ liệu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Mảng chứa ID của các nhân viên cần xóa
 *             required:
 *               - ids
 *     responses:
 *       '200':
 *         description: Thành công. Nhân viên đã được xóa thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo thành công.
 *       '500':
 *         description: Lỗi server. Không thể xóa nhân viên.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.delete("/delete-many", staffController.deleteMany);
/**
 * @swagger
 * /staffs/{id}:
 *   delete:
 *     tags:
 *       - Staffs
 *     summary: Xóa nhân viên
 *     description: Xóa một nhân viên khỏi cơ sở dữ liệu
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của nhân viên cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công. Nhân viên đã được xóa thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo thành công.
 *       '404':
 *         description: Không tìm thấy nhân viên. Không thể xóa nhân viên.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 *       '500':
 *         description: Lỗi server. Không thể xóa nhân viên.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo lỗi.
 */
router.delete("/:id", staffController.delete);
/**
 * @swagger
 * /staffs/{id}:
 *   get:
 *     tags: [Staffs]
 *     summary: Lấy thông tin nhân viên theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của nhân viên cần lấy thông tin
 *     responses:
 *       200:
 *         description: Thành công - Thông tin nhân viên
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Không tìm thấy - Nhân viên không tồn tại
 */
router.use("/:id", staffController.getById);
/**
 * @swagger
 * /staffs:
 *   get:
 *     tags: [Staffs]
 *     summary: Lấy danh sách nhân viên
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Số lượng nhân viên trả về trong mỗi trang
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Số trang hiện tại
 *     responses:
 *       200:
 *         description: Thành công - Danh sách nhân viên
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       500:
 *         description: Lỗi máy chủ - Không thể lấy danh sách nhân viên
 */
router.use("/", staffController.get);

module.exports = router;
