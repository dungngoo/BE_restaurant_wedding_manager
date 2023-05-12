const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const ServiceType = require("../models/ServiceType");
const Menu = require("../models/Menu");
const Service = require("../models/Service");
const Lobby = require("../models/Lobby");
const Party = require("../models/Party");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "jsons");
const sentEmailsFile = path.join(filePath, "sentEmails.json");
let sentEmails = [];

try {
  const fileData = fs.readFileSync(sentEmailsFile, "utf-8");
  sentEmails = JSON.parse(fileData);
} catch (err) {
  console.error(err);
}
class BookingController {
  // Lấy tất cả các bookings và giới hạn chỉ lấy 10 cái mỗi trang
  getAll(req, res, next) {
    const { limit, page } = req.query;
    console.log(limit);
    console.log(page);
    Booking.find({})
      .populate("customerId")
      .populate("lobbyId")
      .populate("services")
      .populate("serviceTypeId")
      .populate("menuId")
      .limit(limit)
      .skip(limit * (page - 1))
      .then((bookings) => {
        res.send(bookings);
      })
      .catch((err) => console.error(err.message));
  }

  async deletePending(req, res, next) {
    const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Lấy thời gian 1 ngày trước// Lấy thời gian 7 ngày trước đó tính tới thời điểm hiện tại
    try {
      const result = await Booking.deleteMany({
        status: "pending",
        createdAt: { $lt: cutoffDate },
      });
      console.log(
        `Đã xóa ${result.deletedCount} đơn đặt tiệc chưa thanh toán trước thời gian hiện tại`
      );
      res.send({
        message: `Đã xóa ${result.deletedCount} đơn đặt tiệc chưa thanh toán trước thời gian hiện tại`,
      }); // Thêm dòng này để trả về response cho client
    } catch (err) {
      console.error("Lỗi khi xóa booking chưa được xác nhận", err);
      next();
    }
  }

  // Cập nhật trạng thái booking từ pending thành paid
  updateBookingStatus = async (req, res, next) => {
    const { id } = req.params;
    try {
      const booking = await Booking.findOneAndUpdate(
        { _id: id, status: "pending" },
        { status: "paid", updatedAt: new Date() },
        { new: true }
      );
      if (!booking) {
        throw new Error("Booking not found or already paid");
      }
      console.log(`Booking ${booking._id} is now paid`);
      if (booking.status === "paid") {
        // Tạo đối tượng Event từ thông tin của booking
        const party = new Party({
          eventDate: booking.eventDate,
          // startTime: booking.startTime,
          // endTime: booking.endTime,
          tableQuantity: booking.tableQuantity,
          menuId: booking.menuId,
          services: booking.services,
          serviceTypeId: booking.serviceTypeId,
          lobbyId: booking.lobbyId,
          customerId: booking.customerId,
        });
        // Lưu đối tượng Event vào CSDL bằng cách sử dụng hàm create trong Mongoose
        party.save();
        console.log("Event created from booking:", party);
        res.status(200).json({ message: "Booking status updated" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  };

  // [POST] /Booking
  async createBooking(req, res, next) {
    const formData = req.body;
    const {
      name,
      phone,
      email,
      eventDate,
      menu,
      eventType,
      lobbyType,
      numbersTable,
      servicePackage,
    } = formData;

    try {
      const menu1 = await Menu.findOne({ name: menu });
      const menuId = menu1._id;

      const serviceType = await ServiceType.findOne({ type: eventType });
      const serviceTypeId = serviceType._id;

      const lobby = await Lobby.findOne({ name: lobbyType });
      const lobbyId = lobby._id;

      const existingCustomer = await Customer.findOne({ email: email });

      let customerId;

      if (existingCustomer) {
        customerId = existingCustomer._id;
        existingCustomer.phone.push(phone);
        await existingCustomer.save();
      } else {
        const newCustomer = new Customer({
          email: email,
          name: name,
          phone: [phone],
        });

        const savedCustomer = await newCustomer.save();
        customerId = savedCustomer._id;
      }

      const services = await Service.find({
        serviceName: { $in: servicePackage },
      });

      const newBooking = new Booking({
        lobbyId: lobbyId,
        customerId: customerId,
        menuId: menuId,
        serviceTypeId: serviceTypeId,
        eventDate: eventDate,
        services: services.map((service) => ({ service: service._id })),
        tableQuantity: numbersTable,
        status: "pending",
      });

      await newBooking.save();
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi khi tạo đơn đặt tiệc" });
    }
  }

  async sendEmail(req, res, next) {
    const formData = req.body;
    const {
      name,
      phone,
      email,
      eventDate,
      menu,
      eventType,
      lobbyType,
      numbersTable,
      servicePackage,
    } = formData;
    // Kiểm tra nếu đơn mới trùng với các trường dữ liệu trong file sentEmails.json
    const isDuplicate = sentEmails.find((sentEmail) => {
      return (
        sentEmail.name === name &&
        sentEmail.email === email &&
        sentEmail.phone === phone &&
        sentEmail.eventDate === eventDate &&
        sentEmail.menu === menu &&
        sentEmail.eventType === eventType &&
        sentEmail.lobbyType === lobbyType &&
        sentEmail.numbersTable === numbersTable &&
        JSON.stringify(sentEmail.servicePackage) ===
          JSON.stringify(servicePackage)
      );
    });
    if (isDuplicate) {
      console.log("Thông tin đặt tiệc bị trùng");
      return res.status(400).json({
        success: false,
        message: "Email đã được gửi với nội dung tương tự",
      });
    }
    const isDuplicateEmail = sentEmails.find((sentEmail) => {
      return sentEmail.email === email;
    });

    if (isDuplicateEmail) {
      console.log("Email bị trùng");
      return res.status(400).json({
        success: false,
        message: "Email này đã có người khác sử dụng",
      });
    }
    try {
      // Tạo một transporter để kết nối tới server  email
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "cskhdhpalace@gmail.com",
          pass: `${process.env.VSCODE_PW_GOOGLE}`,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Cấu hình thông tin email
      const mailOptions = {
        from: "Bộ phận chăm sóc khách hàng nhà hàng tiệc cưới DH PALACE - cskhdhpalace@gmail.com", // Your name and email address,
        to: `${email}`,
        subject: "Cám ơn đã liên hệ với nhà hàng chúng tôi",
        html: `
          <p>Cám ơn bạn đã đặt tiệc tại nhà hàng chúng tôi. Bạn có thể đóng góp ý kiến cho chúng tôi qua trang liên hệ.</p>
        `,
      };

      // Gửi email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);

      // Thêm đơn mới vào mảng sentEmails và ghi vào file sentEmails.json
      sentEmails.push(formData);
      fs.writeFileSync(sentEmailsFile, JSON.stringify(sentEmails));

      return res
        .status(200)
        .json({ success: true, message: "Đã gửi email thành công" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, err: err.message });
    }
  }
}

module.exports = new BookingController();
