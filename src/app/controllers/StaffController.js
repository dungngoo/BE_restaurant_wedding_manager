const { nanoid } = require("nanoid");
const sharp = require("sharp");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const aws = require("aws-sdk");
const mongoose = require("mongoose");
const xlsx = require("xlsx");
const multerS3 = require("multer-s3");
const Staff = require("../models/Staff");
const { uploadFile, updateFile, deleteFile } = require("../middlewares/s3");

// Khởi tạo AWS SDK
const s3 = new aws.S3({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  region: "YOUR_AWS_REGION",
});
class StaffController {
  // [GET] /staff ( get all the staff members)
  get(req, res, next) {
    const { limit, page } = req.query;
    Staff.find({})
      .limit(limit)
      .skip(limit * (page - 1))
      .then((staff) => res.send(staff))
      .catch(next);
  }

  // [GET] /staff/:id
  // Tìm kiếm nhân viên theo id nhân viên hoặc theo tên nhân viên
  async getById(req, res) {
    try {
      await Staff.find({ id: req.params.id });
      return res.status(200).send({ message: "Find Success", staff: Staff });
    } catch (error) {
      return res.status(404).send({ error: "The staff was not found" });
    }
  }

  //   [POST] /staff
  async create(req, res) {
    if (!req.file) {
      return res.status(400).send({ message: "Missing staff image" });
    }

    try {
      // Upload file to S3
      const fileLocation = await uploadFile(req.file);
      console.log(fileLocation);
      const staff = new Staff({
        staff_id: `#NV${nanoid(4)}`,
        ...req.body,
        staffImg: fileLocation.Key,
      });

      staff.save(function (err, staff) {
        if (err) {
          return res
            .status(400)
            .send({ message: "Can't create a staff", err: err.keyValue });
        }
        return res
          .status(200)
          .send({ message: "Created staff successfully", staff: staff });
      });
      // Xóa tệp tin tạm trên máy chủ
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error processing file");
    }
  }

  // [PUT] /staff/:id
  async update(req, res) {
    // set date undefined-undefined-yyyy-month-day to dd/mm/yyyy
    function changeFormat(val) {
      const myArr = val.split("-");
      let year = myArr[2];
      let month = myArr[3];
      let day = myArr[4];
      let formatDate = day + "/" + month + "/" + year;
      return formatDate;
    }
    const id = req.params.id;
    const updatedStaff = req.body;
    const birth = changeFormat(req.body.birth);
    const date = changeFormat(req.body.date);

    try {
      // Kiểm tra nếu có hình ảnh mới được tải lên

      if (req.file) {
        console.log(updatedStaff.oldStaffImg);
        if (updatedStaff.oldStaffImg) {
          await deleteFile(updatedStaff.oldStaffImg);
        }
        const fileKey = `staff-images/${id}-${req.file.originalname}-${req.file.filename}`;
        const newFilePath = req.file.path;

        // Cập nhật hình ảnh trên S3
        await updateFile(fileKey, newFilePath);

        // Xóa tệp tạm trên máy chủ
        fs.unlinkSync(newFilePath);

        // Lưu khóa hình ảnh cập nhật trong req.body
        updatedStaff.staffImg = fileKey;
      } else {
        return res.status(400).send({ message: "Missing staff image" });
      }
      // Cập nhật thông tin nhân viên trong CSDL
      Staff.findOneAndUpdate(
        { _id: id },
        { $set: updatedStaff, birth, date },
        { new: true },
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.status(200).json({ message: "Update successful" });
            console.log(result);
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating staff" });
    }
  }

  // [DELETE] /staff/:id
  async delete(req, res) {
    const id = req.params.id;
    Staff.findById(id, (err, staff) => {
      if (err || !staff) {
        console.log(err);
        return res
          .status(404)
          .json({ message: "Không tìm thấy tài liệu nhân viên" });
      }

      // Lấy staffImg từ nhân viên tìm thấy
      const staffImg = staff.staffImg;

      // Tiến hành xóa nhân viên
      Staff.deleteOne({ _id: id }, (err, result) => {
        if (err || !result.deletedCount) {
          console.log(err);
          return res
            .status(404)
            .json({ message: "Không tìm thấy tài liệu nhân viên" });
        } else {
          // Xóa hình ảnh nhân viên trên S3
          if (staffImg) {
            deleteFile(staffImg);
          }

          res.status(200).json({ message: "Đã xóa tài liệu nhân viên" });
        }
      });
    });
  }
  // [DELETE] MANY /staff/ --- Xóa tất cả những nhân viên trong bản nhân viên
  async deleteMany(req, res) {
    try {
      const { ids } = req.body;
      await Staff.deleteMany({ _id: { $in: ids } });
      res
        .status(200)
        .json({ message: "Xóa thành công những nhân viên đã chỉ định" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Đã xảy ra lỗi khi xóa nhân viên" });
    }
  }
  async calculateSalary(req, res) {
    try {
      const { numMonths, monthlySalary, isPaid, _id } = req.body;
      console.log(numMonths);
      console.log(monthlySalary);
      console.log(isPaid);
      console.log(_id);
      // Tìm nhân viên theo ID
      const staff = await Staff.findById(_id);

      if (!staff) {
        return res.status(404).json({ message: "Nhân viên không tồn tại" });
      }

      // Cập nhật số tháng làm và tiền lương mỗi tháng
      staff.months_worked = numMonths;
      staff.monthly_wage = monthlySalary;

      // Cập nhật trạng thái đã trả lương
      staff.isSalaryPaid = isPaid;

      // Lưu nhân viên đã cập nhật
      await staff.save();

      res.status(200).json({ message: "Tính lương thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Đã xảy ra lỗi khi tính lương" });
    }
  }
}

module.exports = new StaffController();
