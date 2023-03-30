const Staff = require("../models/Staff");

class StaffController {
  // [GET] /staff ( get all the staff members)
  get(req, res, next) {
    Staff.find({})
      .then((staff) => res.send(staff))
      .catch(next);
  }

  // [GET] /staff/create
  getById(req, res, next) {
    Staff.find({ id: req.params.id })
      .then((staff) => res.json(staff))
      .catch(next);
  }

  //   [POST] /staff
  create(req, res, next) {
    try {
      const staff = {
        // id: `#${nanoid(idLength)}`,
        ...req.body,
      };

      req.app.db.get("staff").push(staff).write();

      res.send(staff);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  // [PUT] /staff/:id
  update(req, res) {
    Staff.findOne({ id: req.params.id })
      .then((res) => res.json())
      .catch((err) => {
        return res.status(500).send(err.message);
      });
  }



  // [DELETE] /staff/:id
  delete(req, res, next) {
    Staff.deleteOne({ id: req.params.id })
      .then((res) => res.json())
      .catch(next);
  }
}

module.exports = new StaffController();
