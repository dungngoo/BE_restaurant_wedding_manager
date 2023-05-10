const Customer = require("../models/Customer");
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

    try {
      // Send email
      await transporter.sendMail({
        from: "Bộ phận chăm sóc khách hàng nhà hàng tiệc cưới DH PALACE - cskhdhpalace@gmail.com", // Your name and email address
        to: `${email}`, // Recipient's email address
        subject: "Cám ơn bạn đã liên hệ với nhà hàng chúng tôi", // Subject of the email
        html: `<p>Cám ơn bạn đã đóng góp ý kiến về phía nhà hàng chúng tôi, chúng tôi sẽ cố gắng phản hồi cho bạn trong thời gian sớm nhất có thể</p>`,
      });
      const customer = await Customer.findOne({ email: email });
      if (customer) {
        customer.notes.push(text);
        customer.phone.push(phone);
        await customer.save();
        console.log(
          "Thông tin liên hệ đã được cập nhật thành công trong cơ sở dữ liệu"
        );
      } else {
        const newCustomer = new Customer({
          name,
          email,
          phone: [phone],
          notes: [text],
        });

        await newCustomer.save();
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

module.exports = new CustomerController();
