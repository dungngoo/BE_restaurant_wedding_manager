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
 *        type: object
 *        required:
 *           - fullname
 *           - email
 *           - address
 *           - date
 *           - phonenumber
 *           - identify
 *           - sex
 *           - staff_id
 *           - birthPlace
 *           - dateOfPlace
 *           - staffImg
 *           - job_type
 *        properties:
 *           staff_id:
 *              type: string
 *              description: 'ID nhân viên'
 *           fullname:
 *              type: string
 *              description: 'Họ tên'
 *           staffImg:
 *              type: string
 *              description: 'Ảnh thẻ 3x4'
 *           email:
 *              type: string
 *              description: 'Email'
 *           address:
 *              type: string
 *              description: 'Địa chỉ'
 *           birth:
 *              type: string
 *              description: 'Ngày sinh'
 *           sex:
 *              type: string
 *              description: 'Giới tính'
 *           phonenumber:
 *              type: string
 *              description: 'Số điện thoại'
 *           job_type:
 *              type: string
 *              description: 'Chức vụ nghề nghiệp'
 *           birthPlace:
 *              type: string
 *              description: 'Nơi sinh'
 *           dateOfPlace:
 *              type: string
 *              description: 'Ngày cấp'
 *           identify:
 *              type: string
 *              description: 'Chứng minh nhân dân'
 */

// example:
//  *              staff_id: #NV1237
//  *              fullname: 'Ngo Van Ten'
//  *              staff_img:
//  *              address: 349 Pham Van Sang
//  *              birth: 04-10-2001
//  *              sex: Nam
//  *              phonenumber: 0328038817
//  *              job_type: Nhan vien thoi vu

/**
 * @swagger
 * tags:
 *  name: Staff
 *  description: The staff managaning API
 */

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Create a new staff
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       200:
 *         description: The staff was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       500:
 *         description: server Staff error
 */

// staffController.create
router.post("/", upload.single("staffImg"), staffController.create);

/**
 * @swagger
 * /staff/{id}:
 *  put:
 *    summary: Update the staff by the id
 *    tags: [Staff]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The staff id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Staff'
 *    responses:
 *      200:
 *        description: The staff was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Staff'
 *      404:
 *        description: The staff was not found
 *      500:
 *        description: Some error happened
 */

// staffController.update
router.put("/:id", upload.single("staffImg"), staffController.update);

/**
 * @swagger
 * /staff/delete-many:
 *   delete:
 *     summary: Xóa tất cả nhân viên
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Xóa thành công tất cả nhân viên
 *       500:
 *         description: Lỗi hệ thống
 */
// staffConteoller.deleteMany
router.delete("/delete-many", staffController.deleteMany);

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Remove the staff by id
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff id
 *
 *     responses:
 *       200:
 *         description: The staff was deleted
 *       404:
 *         description: The staff was not found
 */

// staffController.delete
router.delete("/:id", staffController.delete);

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get the staff by id
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff id
 *     responses:
 *       200:
 *         description: The staff description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: The staff was not found
 */
// staffController.getById
router.use("/:id", staffController.getById);

/**
 * @swagger
 * /staff:
 *  get:
 *    summary: Returns the list of all the staff
 *    tags: [Staff]
 *    responses:
 *      200:
 *        description: The list of the staff
 *        content:
 *          application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Staff'
 */

// staffController.get
router.use("/", staffController.get);

module.exports = router;
