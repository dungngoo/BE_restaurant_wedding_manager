const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  bookingId: { type: Schema.Types.ObjectId, ref: "Booking" },
  paymentMethod: String, // Phương thức thanh toán
  paymentAmount: Number, // Số tiền đã thanh toán
  paymentDate: Date, // Ngày thanh toán
  paymentStatus: String, // Trạng thái thanh toán
  providerTransactionCode: String, // Mã đơn hàng của nhà cung cấp dịch vụ thanh toán (nếu có)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
