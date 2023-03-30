const express = require("express");
const router = express.Router();

const staffController = require("../app/controllers/StaffController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *        type: object
 *        required:
 *           - fullname
 *           - staff_img
 *           - address
 *           - phonenumber
 *        properties:
 *           staff_id:
 *              type: string
 *              description: 'The staff id'
 *           fullname:
 *              type: string
 *              description: 'Full name of the staff'
 *           staff_img:
 *              type: string
 *              description: 'Img 3x4 of the staff'
 *           address:
 *              type: string
 *              description: 'Address of the staff'
 *           birth:
 *              type: string
 *              description: 'Bird of the staff'
 *           sex:
 *              type: string
 *              description: 'Sex of the staff'
 *           phonenumber:
 *              type: string
 *              description: 'phone number staff'
 *           job_type:
 *              type: string
 *              description: 'Type of the job'
 *
 */

// example:
//  *              staff_id: #CD12837
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
router.post("/", staffController.create);

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
router.put("/:id", staffController.update);

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

module.exports = router;
