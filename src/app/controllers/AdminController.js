const Admin = require("../models/Admin");
const express = require("express");
const jwt = require("jsonwebtoken");
class AdminController {
  // Đăng nhập admin
  login(req, res, next) {
    const formData = req.body;
    const { username, password } = formData;

    // Kiểm tra thông tin đăng nhập
    if (username === "admin" && password === "123456") {
      // Tạo mã thông báo JWT
      const token = jwt.sign({ username }, "secret_key", { expiresIn: "1h" });

      // Lưu mã thông báo trong cookie hoặc trả về cho client để lưu trữ
      res.cookie("access_token", token);

      res.status(200).send("Bạn đã đăng nhập thành công");
    } else {
      // Thông báo lỗi đăng nhập
      res.status(401).send("Invalid username or password");
    }
  }
  // Kiểm tra token khi admin đăng nhập
  checkToken(req, res, next) {
    // Kiểm tra mã thông báo JWT trong cookie hoặc header của request
    const token =
      req.cookies.access_token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      // Nếu không có mã thông báo thì chuyển hướng về trang đăng nhập
      res.redirect("/admin/login");
    } else {
      // Xác thực mã thông báo
      jwt.verify(token, "secret_key", (err, decoded) => {
        if (err) {
          // Nếu mã thông báo không hợp lệ thì chuyển hướng về trang đăng nhập
          res.redirect("/admin/login");
        } else {
          // Lưu thông tin admin vào biến locals để sử dụng ở các middleware hoặc route tiếp theo
          res.locals.admin = decoded.admin;
          next();
        }
      });
    }
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
