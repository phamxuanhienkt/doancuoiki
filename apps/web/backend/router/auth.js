const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const authMiddleware = require("../middleware/auth");
const { upload } = require("../file/upload");

const router = express.Router();

// Đăng ký
router.post("/register", async (req, res) => {
  const { fullName, email, password, birthDate, hobbies, freeTime, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser = new User({ fullName, email, password, birthDate, hobbies, freeTime, phone });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful.", token, user: { fullName: user.fullName } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Lấy người dùng theo ID từ token
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Cập nhật thông tin người dùng (cần xác thực)
router.put("/user", authMiddleware, async (req, res) => {
  const { fullName, email, password, birthDate, hobbies, freeTime,phone } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Cập nhật thông tin người dùng
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.password = password ? await bcrypt.hash(password, 10) : user.password; // Mã hóa mật khẩu mới
    user.birthDate = birthDate || user.birthDate;
    user.hobbies = hobbies || user.hobbies;
    user.freeTime = freeTime || user.freeTime;
    user.phone = phone || user.phone;

    await user.save();

    res.json({ message: "Profile updated successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

router.post("/upload-avatar", authMiddleware,upload.single("avatar"), async(req, res) => {
  try {
    const filePath = `http://localhost:5000/public/uploads/${req.file.filename}`;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Cập nhật thông tin người dùng
    user.avatar = filePath

    await user.save();
    res.json({ message: "Upload thành công", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tải lên file" });
  }
});


module.exports = router;
