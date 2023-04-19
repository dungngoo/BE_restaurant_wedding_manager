const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/NewsController");

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *        type: object
 *        required:
 *           - title
 *           - content
 *        properties:
 *           news_id:
 *              type: string
 *              description: 'AB123'
 *           title:
 *              type: string
 *              description: The auto-ABC
 *           content:
 *              type: string
 *              description: Hello
 *           example:
 *              news_id: 'AB123'
 *              title: The New ABCDEF
 *              content: Hello World
 */

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get the news by id
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news id
 *     responses:
 *       200:
 *         description: The news description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: The book was not found
 */

router.use("/:id", newsController.getById);

/**
 * @swagger
 * tags:
 *  name: News
 *  description: The News managaning API
 */

router.use("/", newsController.index);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a new News
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: The News was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /News/{id}:
 *  put:
 *    summary: Update the News by the id
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The News id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/News'
 *    responses:
 *      200:
 *        description: The News was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/News'
 *      404:
 *        description: The News was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /News/{id}:
 *   delete:
 *     summary: Remove the News by id
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The News id
 *
 *     responses:
 *       200:
 *         description: The News was deleted
 *       404:
 *         description: The News was not found
 */
router.get("/", (req, res) => {
  const news = req.app.db.get("news");

  res.send(news);
});
module.exports = router;
