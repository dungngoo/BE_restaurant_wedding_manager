const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
class ContactController {
  // Lấy ra tất cả các liên hệ
  getAll(req, res, next) {
    Contact.find({})
      .then((Contacts) => res.json(Contacts))
      .catch(next);
  }
  //  Nhận nội dung phản hôi từ phía khách hàng và lưu vào cơ sở dữ liệu, đồng thời gửi email cám ơn về phía khách hàng
  async sendEmail(req, res, next) {
    const formData = req.body;
    const { name, email, phone, text } = formData;

    // Create a transporter object to send email
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "cskhdhpalace@gmail.com", // Your email address
        pass: "gwcfaegjikjvxrrr", // Your email password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    try {
      // Send email
      await transporter.sendMail({
        from: "Bộ phận chăm sóc khách hàng nhà hàng tiệc cưới DH PALACE - cskhdhpalace@gmail.com", // Your name and email address
        to: `${email}`, // Recipient's email address
        subject: "Cám ơn bạn đã liên hệ với nhà hàng chúng tôi", // Subject of the email
        html: `<p>Cám ơn bạn đã đóng góp ý kiến về phía nhà hàng chúng tôi, chúng tôi sẽ cố gắng phản hồi cho bạn trong thời gian sớm nhất có thể</p>`,
      });
      const contact = await Contact.findOne({ email: email });
      if (contact) {
        contact.notes.push(text);
        contact.phone.push(phone);
        await contact.save();
        console.log(
          "Thông tin liên hệ đã được cập nhật thành công trong cơ sở dữ liệu"
        );
      } else {
        const newContact = new Contact({
          name,
          email,
          phone: [phone],
          notes: [text],
        });

        await newContact.save();
        console.log(
          "Thông tin liên hệ đã được lưu thành công vào cơ sở dữ liệu"
        );
      }
      res.status(200).send({ message: "Liên hệ thành công" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();
