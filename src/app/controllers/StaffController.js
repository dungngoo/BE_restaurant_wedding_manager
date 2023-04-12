const { nanoid } = require("nanoid");
const Staff = require("../models/Staff");

class StaffController {
  // [GET] /staff ( get all the staff members)
  get(req, res, next) {
    Staff.find({})
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
    try {
      console.log(req.body);
      const staff = new Staff({
        staff_id: `#NV${nanoid(4)}`,
        ...req.body,
        staffImg: req.file.path,
      });
      await staff.save();
      return res
        .status(200)
        .send({ message: "Created staff successfully", staff: staff });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Cann't create a staff", err: err.keyValue });
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
    console.log(req.body);
    const id = req.params.id;
    const updatedStaff = req.body;
    const birth = changeFormat(req.body.birth);
    const date = changeFormat(req.body.date);
    // Tìm nhân viên theo staff_id và cập nhật thông tin
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
  }

  // [DELETE] /staff/:id
  async delete(req, res) {
    const id = req.params.id;
    Staff.deleteOne(
      {
        _id: id,
      },
      (err, result) => {
        if (err || !result.deletedCount) {
          console.log(err);
          return res
            .status(404)
            .json({ message: "Không tìm thấy tài liệu nhân viên" });
        } else {
          res.status(200).json({ message: "Đã xóa tài liệu nhân viên" });
        }
      }
    );
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
}

module.exports = new StaffController();
