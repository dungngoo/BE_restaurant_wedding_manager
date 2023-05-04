const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
class ContactController {
  // Lấy ra tất cả các liên hệ
  getAll(req, res, next) {
    Contact.find({})
      .then((Contacts) => res.json(Contacts))
      .catch(next);
  }
  //  Nhận nội dung email từ phía khách hàng và gửi cho email CSKH_DHPalace@gmail.com
  async sendEmail(req, res, next) {
    const formData = req.body;
    const { email, phone, title, text } = formData;

    // Create a transporter object to send email
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ngodung06vn@gmail.com", // Your email address
        pass: "gwcfaegjikjvxrrr", // Your email password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    try {
      // Send email
      await transporter.sendMail({
        from: "ngodung06vn@gmail.com", // Your name and email address
        to: "cskhdhpalace@gmail.com", // Recipient's email address
        subject: title, // Subject of the email
        html: `<p>Email: ${email}</p>
        <p>Số điện thoại: ${phone}</p>
        Nội dung phản hồi:<span>${text}</span>`, // Email content with the form data
      });
      console.log("Đã gửi email thành công");
      res.status(200).send({ message: "Email sent successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();
