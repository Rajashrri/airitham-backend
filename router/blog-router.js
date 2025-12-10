const express = require("express");
const router = express.Router();
const Blog = require("../controllers/blog-controller");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, 'public')));

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "public/blog";
    if (!fs.existsSync("public")) fs.mkdirSync("public");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
router.post(
  "/addblog",
  upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "feature_image", maxCount: 1 },
  ]),
  Blog.addBlog
);
router.get("/categoryOptions", Blog.categoryOptions);
router.route("/getcategoryOptionsTable").get(Blog.getcategoryOptionsTable);
router.get("/getdatablog", Blog.getdatablog);
router.patch("/update-statusblog", Blog.updateStatusblog);
router.delete("/deleteblog/:id", Blog.deleteblog);
router.get("/getblogByid/:id", Blog.getblogByid);
router.patch(
  "/updateblog/:id",
  upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "feature_image", maxCount: 1 },
  ]),
  Blog.updateblog
);
module.exports = router;
