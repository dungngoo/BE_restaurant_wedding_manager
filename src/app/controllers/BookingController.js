const Booking = require("../models/Booking");

class BookingController {
  // [GET] /Booking
  index(req, res, next) {
    Booking.find({})
      .then((booking) => res.json(booking))
      .catch(next);
  }
  // [POST] /Booking
  createBooking = async (req, res) => {
    const {
      name,
      phone,
      eventDate,
      eventType,
      servicePackage,
      menuType,
      decoration,
      lobbyType,
      numbersTable,
    } = req.body;

    const newBooking = new Booking({
      name,
      phone,
      event_date: eventDate,
      event_type: eventType,
      service_package: servicePackage,
      menu_type: menuType,
      decoration,
      lobby_type: lobbyType,
      number_table: numbersTable,
      status: "pending",
    });

    newBooking
      .save()
      .then(() => {
        res.status(200).json({ message: "Booking created successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };
  // [PUT] /Booking/:id

  // [DELETE] /Booking/:id
}

module.exports = new BookingController();
