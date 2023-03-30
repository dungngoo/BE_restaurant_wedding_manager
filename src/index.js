const express = require("express");
// CORS
const cors = require("cors");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
// const low = require('lowdb');
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
// const booksRouter = require('./routes/books');
// const FileSync = require("lowdb/adapters/FileSync");

// const adapter = new FileSync("db.json");
// const db = low(adapter);

// db.defaults({ books: [] }).write();

//  Cấu hình Swagger UI
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Demo API",
      version: "1.0.0",
      description: "A simple Demo API",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["src/routes/*.js"],
};

const specs = swaggerJSDoc(options);
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// app.db = db;
const path = require("path");
const port = 3001;


const route = require("./routes");
const db = require("./config/db");
const { version } = require("os");

// Connect to DB
db.connect();

// CORS
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

// Middleware get post for html
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// HTTP logger
app.use(morgan("combined"));


// app.use("/books", booksRouter);

// // Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on por ${port}`);
});
