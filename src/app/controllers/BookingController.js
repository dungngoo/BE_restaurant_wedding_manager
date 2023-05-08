const Booking = require("../models/Booking");
const Contact = require("../models/Contact");
const ServiceType = require("../models/ServiceType");
const Menu = require("../models/Menu");
const Service = require("../models/Service");
const Lobby = require("../models/Lobby");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const sentEmailsFile = path.join(
  "D:\\QuanLyNhaHangTiecCuoi\\",
  "sentEmails.json"
);
let sentEmails = [];

try {
  const fileData = fs.readFileSync(sentEmailsFile, "utf-8");
  sentEmails = JSON.parse(fileData);
} catch (err) {
  console.error(err);
}
class BookingController {
  // [GET] /Booking
  index(req, res, next) {
    Booking.find({})
      .then((booking) => res.json(booking))
      .catch(next);
  }

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

      const existingContact = await Contact.findOne({ email: email });

      let customerId;

      if (existingContact) {
        customerId = existingContact._id;
        existingContact.phone.push(phone);
        await existingContact.save();
      } else {
        const newContact = new Contact({
          email: email,
          name: name,
          phone: [phone],
        });

        const savedContact = await newContact.save();
        customerId = savedContact._id;
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
    const { email } = formData;

    try {
      // Tạo một transporter để kết nối tới server  email
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "ngodung06vn@gmail.com",
          pass: "gwcfaegjikjvxrrr",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Cấu hình thông tin email
      const mailOptions = {
        from: "ngodung06vn@gmail.com",
        to: `${email}`,
        subject: "Cám ơn đã liên hệ với nhà hàng chúng tôi",
        html: `
          <p>Cám ơn bạn đã đặt tiệc tại nhà hàng chúng tôi. Bạn có thể đóng góp ý kiến cho chúng tôi qua trang liên hệ.</p>
        `,
      };

      // Gửi email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
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
