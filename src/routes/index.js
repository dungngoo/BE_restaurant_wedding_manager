const customerRouter = require("./customer");
const reservationRouter = require("./reservation");
const lobbiesRouter = require("./lobbies");
const servicesRouter = require("./services");
const newsRouter = require("./news");
const promotionRouter = require("./promotion");
const staffRouter = require("./staff");
const tableRouter = require("./table");
// const homeRouter = require('./bill');

function route(app) {
  app.use("/customer", customerRouter);
  app.use("/reservation", reservationRouter);
  app.use("/lobbies", lobbiesRouter);
  app.use("/news", newsRouter);
  app.use("/services", servicesRouter);
  app.use("/promotion", promotionRouter);
  app.use("/staff", staffRouter);
  app.use("/table", tableRouter);
  // app.use('/', render("HOMEPAGE"));

  // app.use('/staff, ')
}

module.exports = route;
