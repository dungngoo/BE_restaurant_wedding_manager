const billRouter = require("./bill");
const courseRouter = require("./course");
const customerRouter = require("./customer");
const materialRouter = require("./material");
const newsRouter = require("./news");
const promotionRouter = require("./promotion");
const staffRouter = require("./staff");
const tableRouter = require("./table");
// const homeRouter = require('./bill');

function route(app) {
  app.use("/bill", billRouter);
  app.use("/course", courseRouter);
  app.use("/customer", customerRouter);
  app.use("/material", materialRouter);

  
  app.use("/news", newsRouter);
  app.use("/promotion", promotionRouter);
  app.use("/staff", staffRouter);
  app.use("/table", tableRouter);

  // app.use('/', render("HOMEPAGE"));

  // app.use('/staff, ')
}

module.exports = route;
