const express = require("express");
const File = require("../models/File");

const router = express.Router();

// Search Files by Keyword
router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;

    const files = await File.find({
      $or: [
        { fileName: { $regex: keyword, $options: "i" } },
        { fileType: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
