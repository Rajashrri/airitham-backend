const express = require("express");
const router = express.Router();
const BlogCategory = require("../controllers/blogcategory-controller");
const {blogSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static(path.resolve(__dirname,'public')))
//crole
router.route("/addblogcategory").post(BlogCategory.addblogcategory);
router.route("/getdatablogcategory").get(BlogCategory.getdatablogcategory);
router.route("/getblogcategoryByid/:id").get(BlogCategory.getblogcategoryByid);
router.route("/updateblogcategory/:id").patch(BlogCategory.updateCategory);
router.route("/deleteblogcategory/:id").delete(BlogCategory.deleteblogcategory);
router.route("/update-statuscategory").patch(BlogCategory.updateStatusCategory);
router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static(path.resolve(__dirname,'public')))

    const storage = multer.diskStorage({
        destination: function(req,file, cb){
        if(!fs.existsSync("public")){
            fs.mkdirSync("public");
        }
        if(!fs.existsSync("public/allimages")){
            fs.mkdirSync("public/allimages");
        }
    
        cb(null, "public/allimages");
        },
        filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname);
        },
    });
  
    const upload = multer({
        storage:storage,
    })

    module.exports = router;