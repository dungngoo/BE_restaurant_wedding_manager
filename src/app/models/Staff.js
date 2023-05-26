const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Staff = new Schema(
  {
    staff_id: { type: String },
    fullname: { type: String, maxLength: 60 },
    email: { type: String, maxLength: 100, unique: true },
    address: { type: String },
    birth: { type: String },
    birthPlace: { type: String },
    date: { type: String },
    dateOfPlace: { type: String },
    phonenumber: { type: String, unique: true },
    identify: { type: String, maxLength: 25, unique: true },
    staffImg: { type: String, unique: true },
    sex: { type: String },
    job_type: { type: String },
    months_worked: { type: Number }, // Số tháng làm việc
    monthly_wage: { type: Number }, // Lương theo số tháng làm việc
    isSalaryPaid: { type: Boolean, default: false }, // Trạng thái lương đã được trả hay chưa
  },
  {
    timestamps: true,
  }
);

Staff.methods.calculateSalary = function () {
  if (this.job_type === "Nhân viên bán thời gian") {
    return this.hourly_rate * this.hours_worked;
  } else if (this.job_type === "Nhân viên thời vụ") {
    return this.wage;
  }
  return 0; // Hoặc giá trị mặc định khác nếu không phải nhân viên bán thời gian
};

module.exports = mongoose.model("Staff", Staff);
