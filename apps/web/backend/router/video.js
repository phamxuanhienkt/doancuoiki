const express = require("express");
const Video = require("../model/videoModel"); // Đảm bảo đường dẫn chính xác
const videoModel = require("../model/videoModel");
const { upload } = require("../file/upload");

const router = express.Router();

// Route để thêm video mới
router.post("/video", [upload.single("file")], async (req, res) => {
  const { title, description, duration, fileSize, tags } = req.body;

  try {
    const newVideo = new Video({
      title,
      description,
      videoPath: "http://localhost:5000/" + req.file.path,
      duration,
      fileSize,
      tags,
    });

    await newVideo.save();
    res
      .status(201)
      .json({ message: "Video saved successfully", video: newVideo });
  } catch (err) {
    res.status(500).json({ message: "Error saving video", error: err.message });
  }
});

// Route để lấy tất cả video
router.get("/video", async (req, res) => {
  try {
    const videos = await videoModel.find({});
    res.status(200).json(videos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: err.message });
  }
});

router.get("/video/:id", async(req, res) => {
  const { id } = req.params;
  const video = await Video.findOne({ _id: id });
  if (video) {
    res.json(video);
  } else {
    res.status(404).send("Video not found");
  }
});
router.put("/video/:id/increment-views", async (req, res) => {
  const { id } = req.params; // ID của video

  try {
    // Tìm video theo ID
    const video = await Video.findOne({ _id: id });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Tăng số lượt xem
    video.views = (video.views || 0) + 1;

    // Lưu lại thay đổi
    await video.save();

    res.status(200).json({ message: "Views incremented", views: video.views });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error incrementing views", error: err.message });
  }
});


module.exports = router;
