const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

require("dotenv").config();

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
  apis: ["../routes/*.js"],
};

const specs = swaggerJSDoc(options);
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const path = require("path");
const port = 3001;

const route = require("../routes");
const db = require("../config/db");

db.connect();

const corsOptions = {
  origin: "https://dhpalace-restaurant-cli.vercel.app",
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(morgan("combined"));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});