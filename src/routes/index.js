const customerRouter = require("./customer");
const bookingRouter = require("./bookings");
const lobbiesRouter = require("./lobbies");
const servicesRouter = require("./services");
const packageRouter = require("./packages");
const menuitemRouter = require("./menuitems");
const contactRouter = require("./contacts");
const serviceTypeRouter = require("./serviceTypes");
const eventRouter = require("./events");
const adminRouter = require("./admin");
const menuRouter = require("./menus");
const newsRouter = require("./news");
const promotionRouter = require("./promotions");
const staffRouter = require("./staff");

function route(app) {
  app.use("/customer", customerRouter);
  app.use("/bookings", bookingRouter);
  app.use("/menuitems", menuitemRouter);
  app.use("/admin", adminRouter);
  app.use("/serviceTypes", serviceTypeRouter);
  app.use("/menus", menuRouter);
  app.use("/lobbies", lobbiesRouter);
  app.use("/events", eventRouter);
  app.use("/news", newsRouter);
  app.use("/services", servicesRouter);
  app.use("/contacts", contactRouter);
  app.use("/packages", packageRouter);
  app.use("/promotions", promotionRouter);
  app.use("/staff", staffRouter);
}

module.exports = route;
