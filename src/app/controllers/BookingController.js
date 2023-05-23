const Booking = require("../models/Booking");
const Contact = require("../models/Customer");
const ServiceType = require("../models/ServiceType");
const Menu = require("../models/Menu");
const MenuItem = require("../models/MenuItem");
const Service = require("../models/Service");
const Lobby = require("../models/Lobby");
const PDFDocument = require("pdfkit");
const Party = require("../models/Party");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const fs = require("fs");
const XlsxPopulate = require("xlsx-populate");
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
  // Xuất hóa đơn
  async calculateInvoiceTotal(booking) {
    try {
      const {
        lobbyId,
        customerId,
        menuId,
        serviceTypeId,
        eventDate,
        services,
        tableQuantity,
      } = booking;

      // Lấy giá sảnh từ bảng Lobby
      const lobby = await Lobby.findById(lobbyId);
      const lobbyPrice = lobby.price;
      console.log(lobbyPrice);

      // Lấy giá dịch vụ từ bảng Services
      const serviceIds = services.map((service) => service.service);
      const selectedServices = await Service.find({
        _id: { $in: serviceIds },
      });
      const servicesPrice = selectedServices.reduce(
        (total, service) => total + service.price,
        0
      );
      console.log(servicesPrice);
      // Lấy giá tiền thực đơn từ bảng Menu
      const menuTotal = new BookingController();
      const menuPrice = await menuTotal.calculateMenuTotal(menuId);
      console.log(menuPrice);

      // Tính tổng hóa đơn
      const totalAmount =
        lobbyPrice + servicesPrice + tableQuantity * menuPrice;
      console.log(totalAmount);
      // Gán giá trị tổng hóa đơn vào trường 'totalAmount' của đối tượng Booking
      booking.totalAmount = totalAmount;

      // Lưu đối tượng Booking vào cơ sở dữ liệu
      const savedBooking = await booking.save();

      return savedBooking;
    } catch (error) {
      throw new Error("Không thể tính tổng tiền hóa đơn");
    }
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

      const existingCustomer = await Contact.findOne({
        $or: [{ email }, { phone }],
      });

      if (existingCustomer) {
        if (
          existingCustomer.email === email &&
          existingCustomer.phone === phone &&
          existingCustomer.name === name
        ) {
          // Trường hợp trùng lặp đầy đủ (name, email, phone)
          // Tiếp tục chạy đoạn code phía dưới
          const customerId = existingCustomer._id;

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

          const invoiceCalculator = new BookingController();
          await invoiceCalculator.calculateInvoiceTotal(newBooking);
          await newBooking.save();

          res.status(200).json({ success: true });
        } else {
          // Trường hợp trùng email hoặc số điện thoại
          let errorMessage = "Email và số điện thoại đã có người dùng";
          if (existingCustomer.email === email) {
            errorMessage = " Email đã được sử dụng.";
          }
          if (existingCustomer.phone === phone) {
            errorMessage = " Số điện thoại đã được sử dụng.";
          }
          res.status(400).json({ error: errorMessage });
        }
      } else {
        // Trường hợp khách hàng mới
        const newCustomer = new Contact({
          name: name,
          email: email,
          phone: phone,
        });

        const savedCustomer = await newCustomer.save();
        const customerId = savedCustomer._id;

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

        const invoiceCalculator = new BookingController();
        await invoiceCalculator.calculateInvoiceTotal(newBooking);
        await newBooking.save();

        res.status(200).json({ success: true });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Lỗi khi tạo đơn đặt tiệc" });
    }
  }
  // Tính tổng tiền các món ăn và gắn vào menu
  async calculateMenuTotal(menuId) {
    try {
      // Tìm menu theo ID và populate danh sách menu item
      const menu = await Menu.findById(menuId).populate("items");

      // Tính tổng tiền các menu item
      const menuTotal = menu.items.reduce((total, menuItem) => {
        return total + menuItem.price;
      }, 0);

      // Trả về tổng tiền của menu
      return menuTotal;
    } catch (error) {
      throw new Error("An error occurred while calculating the menu total");
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
    } catch (error) {
      // Xử lý lỗi
      if (error.code === 11000 && error.keyPattern && error.keyValue) {
        // Trường hợp lỗi trùng lặp
        const duplicateField = Object.keys(error.keyPattern)[0];
        const duplicateValue = error.keyValue[duplicateField];
        const errorMessage = `${duplicateField} "${duplicateValue}" đã có người khác sử dụng`;

        console.log(`Lỗi: ${errorMessage}`);
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      } else {
        // Trường hợp lỗi khác
        console.log("Lỗi:", error.message);
        return res.status(500).json({
          success: false,
          message: "Đã xảy ra lỗi trong quá trình xử lý",
        });
      }
    }
  }

  exportInvoice(req, res) {
    const bookingId = req.params.bookingId; // Get the booking ID from the request params
    Booking.findById(bookingId)
      .populate("lobbyId customerId menuId services.service serviceTypeId") // Populate the related fields
      .exec((err, booking) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "An error occurred while retrieving the booking" });
        }

        if (!booking) {
          return res.status(404).json({ error: "Booking not found" });
        }

        // Create a new PDF document
        const doc = new PDFDocument();

        // Set the response headers for PDF file download
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="invoice_${bookingId}.pdf"`
        );

        // Pipe the PDF document directly to the response
        doc.pipe(res);

        // Generate the content of the invoice
        doc.fontSize(16).text("Invoice", { align: "center" }).moveDown(0.5);
        // Add more content to the invoice as needed using doc.text(), doc.image(), etc.

        // End the PDF document
        doc.end();
      });
  }
  // Tính doanh thu theo tuần
  async calculateByWeek(req, res, next) {
    try {
      const currentDate = new Date();
      const startOfWeek = new Date(currentDate);
      startOfWeek.setUTCHours(0, 0, 0, 0);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(currentDate);
      endOfWeek.setUTCHours(23, 59, 59, 999);
      endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

      console.log(startOfWeek);
      console.log(endOfWeek);

      const totalRevenue = await Booking.aggregate([
        {
          $match: {
            eventDate: { $gte: startOfWeek, $lte: endOfWeek },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
          },
        },
      ]);
      const formattedRevenue = totalRevenue[0].total;
      res.json({ totalRevenue: formattedRevenue });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while fetching the weekly revenue total",
      });
    }
  }
  // Tính doanh thu theo tháng
  async calculateByMonth(req, res, next) {
    try {
      const { year, month } = req.query;

      // Lấy ngày đầu và ngày cuối của tháng
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

      // Tạo pipeline để lấy tổng số tiền hóa đơn trong khoảng thời gian từ ngày đầu đến ngày cuối tháng
      const pipeline = [
        {
          $match: {
            status: "paid",
            eventDate: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        {
          $group: {
            _id: { $dayOfMonth: "$eventDate" },
            dailyRevenue: { $sum: "$totalAmount" },
          },
        },
      ];

      const pipelineMonth = [
        {
          $match: {
            status: "paid",
            createdAt: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            monthlyRevenue: { $sum: "$totalAmount" },
          },
        },
      ];

      // Tính tổng số tiền hóa đơn theo tháng và ngày
      const result = await Booking.aggregate(pipeline);
      const resultMonth = await Booking.aggregate(pipelineMonth);

      // Tạo đối tượng dữ liệu doanh thu theo ngày
      const dailyRevenueData = {};
      result.forEach((item) => {
        dailyRevenueData[item._id] = item.dailyRevenue;
      });

      res.json({
        dailyRevenueData,
        monthlyRevenueData:
          resultMonth.length > 0 ? resultMonth[0].monthlyRevenue : 0,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while fetching the daily revenue",
      });
    }
  }
  async calculateMenuPrice(menuId) {
    try {
      // Tải thông tin menu từ menuId
      const menu = await Menu.findById(menuId).populate("items");

      let menuPrice = 0;

      // Duyệt qua từng mục trong menu và tính tổng giá trị của chúng
      for (const item of menu.items) {
        menuPrice += item.price;
      }

      return menuPrice;
    } catch (error) {
      console.error("Error calculating menu price:", error);
      throw error;
    }
  }
  // Hàm xuất hóa đơn dưới dạng PDF
  exportInvoiceToPDF = async (booking) => {
    const doc = new PDFDocument();
    doc.font("fonts/tiengviet.ttf");

    // Tạo stream để ghi dữ liệu vào file PDF
    const stream = doc.pipe(fs.createWriteStream(`invoice-${booking._id}.pdf`));

    // Thông tin khách hàng
    doc.fontSize(16).text("Thông tin khách hàng:", { underline: true });
    doc.text(`Tên khách hàng: ${booking.customerId.name}`);
    doc.text(`Số điện thoại: ${booking.customerId.phone}`);
    doc.text(`Email: ${booking.customerId.email}`);
    // Thêm thông tin khách hàng khác nếu cần

    // Thông tin đơn đặt tiệc
    doc.fontSize(16).text("Thông tin đơn đặt tiệc:", { underline: true });
    doc.text(`Ngày đặt tiệc: ${booking.createdAt}`);
    doc.text(`Ngày tổ chức tiệc: ${booking.eventDate}`);
    doc.text(`Số lượng bàn: ${booking.tableQuantity}`);
    // Thêm thông tin khác của đơn đặt tiệc

    // Tính tổng tiền
    let totalAmount = 0;

    // Tính tổng tiền sảnh
    const lobby = booking.lobbyId;
    const lobbyPrice = lobby.price;

    totalAmount += lobbyPrice;

    // Tính tổng tiền thực đơn
    const menuPrice = await this.calculateMenuTotal(booking.menuId);
    let totalMenuPrice = 0;

    const menu = await Menu.findById(booking.menuId._id);
    for (const itemId of menu.items) {
      const menuItem = await MenuItem.findById(itemId);
      if (menuItem) {
        const menuItemPrice = menuItem.price;

        totalMenuPrice += menuItemPrice;
        doc.text(`Tiền món ăn (${menuItem.name}): ${menuItemPrice.toLocaleString()} VNĐ`);
      } else {
        console.log(`Không tìm thấy menuItem với id ${itemId} VNĐ`);
      }
    }

    doc.text(`Tổng tiền món ăn (${menu.name}): ${totalMenuPrice.toLocaleString()} VNĐ`);
    totalMenuPrice = menuPrice * booking.tableQuantity;
    totalAmount += totalMenuPrice;
    doc.text(
      `Tiền thực đơn (số lượng bàn x giá tiền thực đơn): ${totalMenuPrice.toLocaleString()} VNĐ`
    );
    let servicePrice;
    // Tính tổng tiền dịch vụ
    for (const service of booking.services) {
      const serviceItem = await Service.findById(service.service).populate(""); // Replace '' with the field you want to populate, if applicable

      servicePrice = serviceItem.price;
      totalAmount += servicePrice;
    }

    console.log(totalAmount);
    totalAmount += totalMenuPrice;

    // Thêm thông tin tổng tiền vào hóa đơn
    doc.fontSize(16).text("Thông tin thanh toán:", { underline: true });
    doc.text(`Tiền sảnh: ${lobbyPrice.toLocaleString()} VNĐ`);
    doc.text(`Tiền dịch vụ: ${servicePrice.toLocaleString()} VNĐ`);
    // Thêm thông tin tiền dịch vụ

    doc.text(`Tổng cộng: ${totalAmount.toLocaleString()} VNĐ`);

    // Kết thúc ghi dữ liệu vào file PDF
    doc.end();

    // Đợi cho stream ghi dữ liệu vào file PDF hoàn tất
    await new Promise((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    // Trả về tên file PDF đã tạo
    return `invoice-${booking._id}.pdf`;
  };

  postInvoiceToPDF = (req, res) => {
    const booking = req.body; // Nhận dữ liệu booking từ client
    // Gọi hàm xuất hóa đơn (exportInvoiceToPDF) với dữ liệu booking
    this.exportInvoiceToPDF(booking)
      .then((pdfPath) => {
        // Chuyển đổi đường dẫn tương đối thành đường dẫn tuyệt đối
        const absolutePath = path.resolve(pdfPath);
        // Trả về file PDF đã tạo cho client
        res.sendFile(absolutePath);
      })
      .catch((error) => {
        // Xử lý lỗi (nếu có)
        console.error("Error exporting invoice:", error);
        res.status(500).json({ error: "Error exporting invoice" });
      });
  };
}

module.exports = new BookingController();
