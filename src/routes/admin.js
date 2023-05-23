const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");
const middlewareController = require("../app/controllers/middlewareController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - fullName
 *       properties:
 *         username:
 *           type: string
 *           description: Tên đăng nhập của quản trị viên
 *         password:
 *           type: string
 *           description: Mật khẩu của quản trị viên
 *         email:
 *           type: string
 *           format: email
 *           description: Địa chỉ email của quản trị viên
 *         fullName:
 *           type: string
 *           description: Họ và tên đầy đủ của quản trị viên
 */

/**
 * @swagger
 * /admin/login:
 *  post:
 *    summary: Đăng nhập hệ thống quản lý
 *    tags: [Admin]
 *    parameters:
 *      - name: username
 *        in: formData
 *        description: Tên đăng nhập
 *        required: true
 *        type: string
 *      - name: password
 *        in: formData
 *        description: Mật khẩu
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Trả về một accessToken cho phía Client
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      500:
 *        description: Invalid username or password
 */
router.post("/login", adminController.login);
/**
 * @swagger
 * /admin/logout:
 *  get:
 *    summary: Đăng xuất khỏi hệ thống
 *    tags: [Admin]
 *    responses:
 *      200:
 *        description: Đăng xuất thành công
 *      500:
 *        description: Lỗi xảy ra trong quá trình đăng xuất
 */
router.use("/logout", adminController.logout);

module.exports = router;
