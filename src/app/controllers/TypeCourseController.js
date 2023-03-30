const TypeCourse = require("../models/TypeCourse");

class TypeCourseController {
  // [GET] /TypeCourse
  index(req, res, next) {
    TypeCourse.find({})
      .then((typeCourses) => res.json(typeCourses))
      .catch(next);
  }

  // [GET] /TypeCourse/create

  // [PUT] /TypeCourse/:id

  // [DELETE] /TypeCourse/:id
}

module.exports = new TypeCourseController();
