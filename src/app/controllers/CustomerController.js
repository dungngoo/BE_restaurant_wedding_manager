const Contact = require("../models/Customer");
const nodemailer = require("nodemailer");
class CustomerController {
  // Lấy ra tất cả các liên hệ
  getAll(req, res, next) {
    Customer.find({})
      .then((customers) => res.json(customers))
      .catch(next);
  }
  //  Nhận nội dung phản hôi từ phía khách hàng và lưu vào cơ sở dữ liệu, đồng thời gửi email cám ơn về phía khách hàng
  async sendEmail(req, res, next) {
    const formData = req.body;
    const { name, email, phone, text } = formData;

    try {
      // Check if contact with the same email or phone number already exists
      const existingContact = await Contact.findOne({ email, phone });

      if (existingContact) {
        // Check if name is different
        if (existingContact.name !== name) {
          return res
            .status(400)
            .json({ error: "Email và số điện thoại đã có người khác sử dụng" });
        }

        // Update notes of existing contact
        existingContact.notes.push(text);
        await existingContact.save();
        console.log(
          "Thông tin liên hệ đã được cập nhật thành công trong cơ sở dữ liệu"
        );
        res.status(200).json({ message: "Cập nhật liên hệ thành công" });
      } else {
        // Check if email or phone already exist in another contact
        const contactWithSameEmail = await Contact.findOne({ email });
        const contactWithSamePhone = await Contact.findOne({ phone });

        if (contactWithSameEmail || contactWithSamePhone) {
          return res.status(400).json({
            error: "Email hoặc số điện thoại đã tồn tại trong hệ thống",
          });
        }

        // Create new contact
        const newContact = new Contact({
          name,
          email,
          phone,
          notes: [text],
        });

        await newContact.save();
        console.log(
          "Thông tin liên hệ đã được lưu thành công vào cơ sở dữ liệu"
        );
        res.status(200).json({ message: "Lưu liên hệ thành công" });
      }

      // Create a transporter object to send email
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "cskhdhpalace@gmail.com", // Your email address
          pass: `${process.env.VSCODE_PW_GOOGLE}`, // Your email password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Send email
      await transporter.sendMail({
        from: "Bộ phận chăm sóc khách hàng nhà hàng tiệc cưới DH PALACE - cskhdhpalace@gmail.com", // Your name and email address
        to: `${email}`, // Recipient's email address
        subject: "Cám ơn bạn đã liên hệ với nhà hàng chúng tôi", // Subject of the email
        html: `<p>Cám ơn bạn đã đóng góp ý kiến về phía nhà hàng chúng tôi, chúng tôi sẽ cố gắng phản hồi cho bạn trong thời gian sớm nhất có thể</p>`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CustomerController();
