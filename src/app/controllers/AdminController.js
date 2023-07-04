const Admin = require("../models/Admin");
const express = require("express");
const jwt = require("jsonwebtoken");
class AdminController {
  // Đăng nhập admin
  login(req, res, next) {
    const { username, password } = req.body;
    // Check if username and password are correct
    if (username === "admin" && password === "123456") {
      const accessToken = jwt.sign({ username }, "sercret_key", {
        expiresIn: "1h",
      });
      // Lưu mã thông báo trong cookie hoặc trả về cho client để lưu trữ
      res.status(200).json({ accessToken });
    } else {
      res.status(401).send("Invalid username or password");
    }
  }
  authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401); // Không được xác thực

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Lỗi xác thực

      req.user = user;
      next();
    });
  }

  // xoá session và chuyển hướng về trang đăng nhập
  logout(req, res) {
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          console.error("Logout error:", err);
        } else {
          res.clearCookie("access_token");
          console.log("Đăng xuất thành công");
        }
      });
    }
  }
}

module.exports = new AdminController();
