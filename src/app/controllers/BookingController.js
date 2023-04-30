const Booking = require("../models/Booking");
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
  createBooking = async (req, res) => {
    const {
      name,
      phone,
      eventDate,
      eventType,
      servicePackage,
      menuType,
      decoration,
      lobbyType,
      numbersTable,
    } = req.body;

    const newBooking = new Booking({
      name,
      phone,
      event_date: eventDate,
      event_type: eventType,
      service_package: servicePackage,
      menu_type: menuType,
      decoration,
      lobby_type: lobbyType,
      number_table: numbersTable,
      status: "pending",
    });

    newBooking
      .save()
      .then(() => {
        res.status(200).json({ message: "Booking created successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };
  // Gửi email cho admin sau khi khách hàng đặt tiệc

  async sendEmail(req, res, next) {
    const formData = req.body;
    const {
      name,
      phone,
      eventDate,
      eventType,
      servicePackage,
      menuType,
      decoration,
      lobbyType,
      numbersTable,
      capacity,
    } = formData;
    // Kiểm tra xem có email nào trùng nội dung và cách đây không quá 24 giờ hay không
    const content = `
    <p>Tên khách hàng: ${name}</p>
    <p>Số điện thoại: ${phone}</p>
    <p>Ngày tổ chức sự kiện: ${eventDate}</p>
    <p>Loại sự kiện: ${eventType}</p>
    <p>Gói dịch vụ: ${servicePackage}</p>
    <p>Loại phòng đón tiếp: ${lobbyType}</p>
    <p>Số lượng bàn: ${numbersTable}</p>
    <p>Sức chứa: ${capacity}</p>
  `;
    const duplicateEmail = sentEmails.find((email1) => {
      const isDuplicate = sentEmails.find((email2) => email2.content === content);
      const sentAt = new Date(email1.sentAt);
      const sentWithin24Hours = Date.now() - sentAt < 24 * 60 * 60 * 1000;
      return isDuplicate && sentWithin24Hours;
    });
    if (duplicateEmail) {
      console.log(
        "Đã có email trùng lặp được gửi trong khoảng thời gian gần đây."
      );
      res
        .status(500)
        .send({ error: "Email đã được gửi với nội dung tương tụ" });
      return;
    }

    try {
      // Tạo một transporter để kết nối tới server email
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
        to: "ngodung46vn@gmail.com",
        subject: "Thông tin đăng ký đơn đặt tiệc",
        html: `
        <p>Tên khách hàng: ${name}</p>
        <p>Số điện thoại: ${phone}</p>
        <p>Ngày tổ chức sự kiện: ${eventDate}</p>
        <p>Loại sự kiện: ${eventType}</p>
        <p>Gói dịch vụ: ${servicePackage}</p>
        <p>Loại menu: ${menuType}</p>
        <p>Trang trí: ${decoration}</p>
        <p>Loại phòng đón tiếp: ${lobbyType}</p>
        <p>Số lượng bàn: ${numbersTable}</p>
        <p>Sức chứa: ${capacity}</p>
      `,
      };

      // Gửi email
      const info = await transporter.sendMail(mailOptions);
      const newEmail = { content, sentAt: new Date() };
      sentEmails.push(newEmail);
      const jsonData = JSON.stringify(sentEmails);
      fs.writeFileSync("D:\\QuanLyNhaHangTiecCuoi\\sentEmails.json", jsonData);
      console.log("Email sent: " + info.response);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new BookingController();
