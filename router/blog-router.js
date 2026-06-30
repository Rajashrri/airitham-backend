const express = require("express");
const router = express.Router();
const Blog = require("../controllers/blog-controller");

const bodyparser = require("body-parser");
const { blogUpload } = require("../utils/upload");
router.use(bodyparser.urlencoded({ extended: true }));


// Routes
router.post(
  "/addblog",
  blogUpload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "feature_image", maxCount: 1 },
  ]),
  Blog.addBlog
);

router.patch(
  "/updateblog/:id",
  blogUpload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "feature_image", maxCount: 1 },
  ]),
  Blog.updateblog

);
router.get("/categoryOptions", Blog.categoryOptions);
router.route("/getcategoryOptionsTable").get(Blog.getcategoryOptionsTable);
router.get("/getdatablog", Blog.getdatablog);
router.patch("/update-statusblog", Blog.updateStatusblog);
router.delete("/deleteblog/:id", Blog.deleteblog);
router.get("/getblogByid/:id", Blog.getblogByid);
router.patch("/update-featuredblog", Blog.updateFeaturedblog);
router.patch("/update-seo/:id", Blog.updateSeo);
router.get("/getSeoById/:id", Blog.getSeoById);


module.exports = router;
