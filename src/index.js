const express = require("express");
// CORS
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();

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
      title: "DH Palace API",
      version: "1.0.0",
      description: "APIs of the Restaurant Wedding Management System",
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

// Connect to DB
db.connect();

// CORS
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads',express.static('uploads'));

// Middleware get post for html
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// HTTP logger
app.use(morgan("combined"));

// // Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on por ${port}`);
});
