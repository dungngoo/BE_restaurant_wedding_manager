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
 *   post:
 *     summary: Đăng nhập và nhận mã thông báo truy cập
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: admin
 *               password: 123456
 *     responses:
 *       '200':
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *               example:
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjIzMjIxODQ0LCJleHAiOjE2MjMyMjU0NDR9.3b8nWOD0EjszhD_eF4YX4q7i6A5Y6vQDfqLksQYXqI4
 *       '401':
 *         description: Sai tên đăng nhập hoặc mật khẩu
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: Invalid username or password
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
