const { User } = require("../models/user");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


// Get user theo id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: "Không tìm thấy người dùng!" });
  }
  res.status(200).send(user);
});

// Tao user khi sign up
router.post(`/signup`, async (req, res) => {
  const {
    name,
    phone,
    address,
    email,
    password,
    isAdmin,
    images,
    createdDate,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    const existingUserByPh = await User.findOne({ phone: phone });

    if (existingUser || existingUserByPh) {
      console.log('User already exists');
      return res
        .status(400)
        .json({ error: true, msg: "Tài khoản này đã tồn tại!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      name: name,
      phone: phone,
      address: address || " ",
      email: email,
      password: hashPassword,
      isAdmin: false,
      images: images || [],
      createdDate: createdDate || Date.now(),
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );
    res.status(200).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Lỗi server" });
  }
});

// User sign in
router.post(`/signin`, async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ error: true, msg: "Không tìm thấy người dùng!" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res
        .status(401)
        .json({ error: true, msg: "Mật khẩu của bạn không đúng!" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );
    console.log({
      user: existingUser,
      token: token,
      userId: existingUser._id,
      msg: "Xác thực người dùng",
    });

    return res
      .status(200)
      .send({
        user: existingUser,
        token: token,
        userId: existingUser._id,
        // name: existingUser.name,
        // phone: existingUser.phone,
        // address: existingUser.address,
        msg: "Đã xác thực người dùng!",
      });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Lỗi đăng nhập!" });
  }
});

// Thay doi thong tin user - name, phone, address, email, image theo ID
router.put("/:id", async (req, res) => {
  console.log("Received Body:", req.body);
  const { name, phone, email, address, images } = req.body;

  // check ID
  const userExist = await User.findById(req.params.id);
  if (!userExist) {
    return res
      .status(404)
      .json({ error: true, msg: "Tài khoản không tồn tại" });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      phone: phone,
      email: email,
      address: address,
      images: images,
    },
    { new: true }
  );

  if (!user)
    return res.status(400).send("Tài khoản không cập nhật thành công!");

  res.status(200).json({ success: true, user, msg: "Cập nhật thành công" });
});

// Thay doi password
router.put("/changePassword/:id", async (req, res) => {
  const { email, password, newPass } = req.body;

  try {
    console.log("Received request to change password for email: ", email);

    // Tim user theo email
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      console.log("User not found with email:", email);
      return res
        .status(404)
        .json({ error: true, msg: "Không tìm thấy email!" });
    }
    console.log("User found:", existingUser);

    // Kiểm tra mật khẩu hiện tại
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      console.log("Current password is incorrect for email:", email);
      return res
        .status(400)
        .json({ error: true, msg: "Mật khẩu hiện tại không đúng" });
    }

    // Kiểm tra mật khẩu mới
    if (!newPass) {
      console.log("New password is not provided for email: ", email);
      return res
        .status(400)
        .json({ error: true, msg: "Vui lòng cùng cấp mật khẩu mới" });
    }

    if (password === newPass) {
      console.log(
        "New password is the same as the current password for email:",
        email
      );
      return res
        .status(400)
        .json({
          error: true,
          msg: "Mật khẩu mới không được trùng mật khẩu hiện tại!",
        });
    }

    console.log("New password provided, proceeding with password update");

    // Hash the new password
    const newPassword = bcrypt.hashSync(newPass, 10);
    console.log("New password hashed");

    // Cap nhat mat khau
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: newPassword },
      { new: true }
    );

    if (!user) {
      console.log("Failed to update User with id:", req.params.id);
      return res
        .status(400)
        .json({ error: true, msg: "Không thể cập nhật mật khẩu!" });
    }

    console.log("User password updated successfully:", user);
    res.json({ success: true, user });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: true, msg: "Server error" });
  }
});

module.exports = router;
