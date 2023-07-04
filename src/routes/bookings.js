const express = require("express");
const router = express.Router();

const bookingController = require("../app/controllers/BookingController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - lobbyId
 *         - customerId
 *         - menuId
 *         - serviceTypeId
 *         - eventDate
 *       properties:
 *         lobbyId:
 *           type: string
 *           description: ID của sảnh đặt tiệc
 *         customerId:
 *           type: string
 *           description: ID của khách hàng
 *         menuId:
 *           type: string
 *           description: ID của thực đơn
 *         services:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 description: ID của dịch vụ
 *         serviceTypeId:
 *           type: string
 *           description: ID của loại dịch vụ
 *         eventDate:
 *           type: string
 *           format: date-time
 *           description: Ngày diễn ra sự kiện
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - paid
 *           default: pending
 *           description: Trạng thái đơn đặt tiệc
 *         tableQuantity:
 *           type: number
 *           description: Số lượng bàn đặt trong đơn đặt tiệc
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Ngày tạo đơn đặt tiệc
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Ngày cập nhật đơn đặt tiệc
 *         totalAmount:
 *           type: number
 *           default: 0
 *           description: Tổng số tiền của đơn đặt tiệc
 */

// bookingController.index
/**
 * @swagger
 * /bookings/caculateMonth:
 *  get:
 *    summary: Tính toán doanh thu theo tháng
 *    tags: [Bookings]
 *    parameters:
 *      - name: year
 *        in: query
 *        description: Năm của tháng cần tính toán doanh thu
 *        required: true
 *        type: integer
 *      - name: month
 *        in: query
 *        description: Tháng cần tính toán doanh thu (1-12)
 *        required: true
 *        type: integer
 *    responses:
 *      200:
 *        description: Trả về doanh thu theo ngày và doanh thu theo tháng
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                dailyRevenueData:
 *                  type: object
 *                  additionalProperties:
 *                    type: number
 *                monthlyRevenueData:
 *                  type: number
 *      500:
 *        description: Lỗi xảy ra trong quá trình tính toán doanh thu
 */
router.use("/caculateMonth", bookingController.calculateByMonth);
/**
 * @swagger
 * /bookings/deletePendingBookings:
 *  delete:
 *    summary: Xóa các đơn đặt tiệc chưa thanh toán trước thời gian hiện tại
 *    tags: [Bookings]
 *    responses:
 *      200:
 *        description: Xóa thành công đơn đặt tiệc chưa thanh toán
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Thông báo xóa thành công
 *      500:
 *        description: Lỗi xảy ra trong quá trình xóa đơn đặt tiệc chưa thanh toán
 */
router.delete("/deletePendingBookings", bookingController.deletePending);
/**
 * @swagger
 * /bookings/sendEmail:
 *  post:
 *    summary: Gửi email xác nhận đặt tiệc
 *    tags: [Bookings]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BookingFormData'
 *    responses:
 *      200:
 *        description: Gửi email thành công
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 *      400:
 *        description: Email đã được gửi với nội dung tương tự hoặc thông tin đặt tiệc bị trùng
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 *      500:
 *        description: Lỗi xảy ra trong quá trình gửi email
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 */
router.post("/sendEmail", bookingController.sendEmail);

/**
 * @swagger
 * /bookings/exportInvoiceToPDF:
 *  post:
 *    summary: Xuất hóa đơn dưới dạng file PDF
 *    tags: [Bookings]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Booking'
 *    responses:
 *      200:
 *        description: Trả về file PDF hóa đơn
 *        content:
 *          application/pdf:
 *            schema:
 *              type: string
 *              format: binary
 *      500:
 *        description: Lỗi xảy ra trong quá trình xuất hóa đơn
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.post("/exportInvoiceToPDF", bookingController.postInvoiceToPDF);
/**
 * @swagger
 * /bookings/updateBooking/{id}:
 *   put:
 *     tags: [Bookings]
 *     summary: Cập nhật trạng thái đặt tiệc
 *     description: Cập nhật trạng thái của đơn đặt tiệc từ "đang chờ" thành "đã thanh toán"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đơn đặt tiệc cần cập nhật
 *     responses:
 *       '200':
 *         description: Trạng thái đặt tiệc đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo thành công
 *       '500':
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi
 */
router.put("/updateBooking/:id", bookingController.updateBookingStatus);
/**
 * @swagger
 * /bookings/export/{bookingId}:
 *   get:
 *     tags: [Bookings]
 *     summary: Xuất hóa đơn
 *     description: Xuất hóa đơn dưới dạng tệp PDF cho đơn đặt tiệc
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đơn đặt tiệc để xuất hóa đơn
 *     responses:
 *       '200':
 *         description: Tệp PDF hóa đơn đã được xuất thành công
 *         content:
 *           application/pdf:
 *             schema:
 *               type: file
 *       '404':
 *         description: Đơn đặt tiệc không được tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi
 *       '500':
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi
 */
router.use("/export/:bookingId", bookingController.exportInvoice);
/**
 * @swagger
 * /bookings/caculate:
 *   get:
 *     tags: [Bookings]
 *     summary: Tính doanh thu theo tuần
 *     description: Tính tổng doanh thu trong tuần hiện tại
 *     responses:
 *       '200':
 *         description: Tổng doanh thu trong tuần đã được tính toán thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: string
 *                   description: Tổng doanh thu được định dạng
 *       '500':
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi
 */
router.use("/caculate", bookingController.calculateByWeek);
/**
 * @swagger
 * /bookings/:
 *   post:
 *     tags: [Bookings]
 *     summary: Tạo đơn đặt tiệc mới
 *     description: Tạo một đơn đặt tiệc mới dựa trên thông tin được cung cấp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên khách hàng
 *               phone:
 *                 type: string
 *                 description: Số điện thoại khách hàng
 *               email:
 *                 type: string
 *                 description: Địa chỉ email khách hàng
 *               eventDate:
 *                 type: string
 *                 format: date
 *                 description: Ngày tổ chức tiệc
 *               menu:
 *                 type: string
 *                 description: Tên thực đơn
 *               eventType:
 *                 type: string
 *                 description: Loại sự kiện
 *               lobbyType:
 *                 type: string
 *                 description: Loại sảnh
 *               numbersTable:
 *                 type: number
 *                 description: Số lượng bàn
 *               servicePackage:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Gói dịch vụ
 *     responses:
 *       '200':
 *         description: Đơn đặt tiệc được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Trạng thái thành công
 *       '400':
 *         description: Lỗi yêu cầu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi
 *       '500':
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi
 */
router.post("/", bookingController.createBooking);
/**
 * @swagger
 * /bookings/:
 *   get:
 *     tags: [Bookings]
 *     summary: Lấy danh sách tất cả các đơn đặt tiệc
 *     description: Lấy danh sách tất cả các đơn đặt tiệc dựa trên các thông số tìm kiếm (nếu có)
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số lượng kết quả trả về mỗi trang
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang hiện tại
 *     responses:
 *       '200':
 *         description: Danh sách các đơn đặt tiệc được lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       '500':
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Thông báo lỗi
 */
router.use("/", bookingController.getAll);

module.exports = router;
