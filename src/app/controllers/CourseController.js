const Course = require('../models/Course');

class CourseController {
    // [GET] /course
    index(req, res, next) {
        Course.find({})
            .then(courses => res.json(courses))
            .catch(next);
    }

    // [GET] /course/create


    // [PUT] /course/:id
    

    // [DELETE] /course/:id
}

module.exports = new CourseController();
