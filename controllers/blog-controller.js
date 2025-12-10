const { BlogCategory } = require("../models/blogcategory-model");
const { Blog } = require("../models/blog-model");
const path = require("path");  // ✅ add this line
const fs = require("fs");      // ✅ add this too
function createCleanUrl(title) {
  // Convert the title to lowercase
  let cleanTitle = title.toLowerCase();
  // Remove special characters, replace spaces with dashes
  cleanTitle = cleanTitle.replace(/[^\w\s-]/g, "");
  cleanTitle = cleanTitle.replace(/\s+/g, "-");

  return cleanTitle;
}
const formatDateDMY = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
// -----------project------------------
const addBlog = async (req, res) => {
  try {
const { name, category_id, date, author_name, short_description, details, createdBy } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({ msg: "Name and Category are required" });
    }

    // Handle uploaded files
    const mainImage = req.files["main_image"]
      ? req.files["main_image"][0].filename
      : "";
    const featureImage = req.files["feature_image"]
      ? req.files["feature_image"][0].filename
      : "";
 const url = createCleanUrl(req.body.name);
 const now = new Date(); // ✅ Define now
    const createdAt = formatDateDMY(now); // 👈 formatted date
    const newBlog = new Blog({
      name,
      category_id,
      main_image: mainImage,
      feature_image: featureImage,
      createdBy,
      date, author_name, short_description, details,
       status: 1, // default active
       url,
       createdAt
    });

    await newBlog.save();

    res.json({
      msg: "Blog added successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Add Blog Error:", error);
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};


//add project
const categoryOptions = async (req, res) => {
  try {
    const item = await BlogCategory.find({ status: 1 });
    if (!item) {
      res.status(404).json({ msg: "No Data Found" });
      return;
    }

    res.status(200).json({
      msg: item,
    });
  } catch (error) {
    console.log(`Category ${error}`);
  }
};


const getcategoryOptionsTable = async (req, res) => {
  try {
    const categories = await BlogCategory.find({}, "_id name"); // Fetch only ID & name

    res.status(200).json({
      success: true,
      msg: categories, // Return category data
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

// util function to format the date



//update status

const updateStatusblog = async (req, res) => {
  try {
    const { status, id } = req.body;

    const result = await Blog.updateOne(
      { _id: id },
      {
        $set: {
          status: status,
        },
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      msg: "Updated Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//update


// 📍 Update blog
const updateblog = async (req, res) => {
  try {
    const { name, category_id, category_name, date, author_name, short_description, details, updatedBy } = req.body;
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // Update fields
    blog.name = name || blog.name;
    blog.category_id = category_id || blog.category_id;
    blog.category_name = category_name || blog.category_name;
    blog.date = date || blog.date;
    blog.author_name = author_name || blog.author_name;
    blog.short_description = short_description || blog.short_description;
    blog.details = details || blog.details;
    blog.updatedBy = updatedBy || blog.updatedBy;

    // 📂 Image upload handling
    if (req.files) {
      // If main_image uploaded
      if (req.files.main_image) {
        // delete old image if exists
        if (blog.main_image) {
          const oldMainPath = path.join(__dirname, "../public/blog/", blog.main_image);
          if (fs.existsSync(oldMainPath)) fs.unlinkSync(oldMainPath);
        }
        blog.main_image = req.files.main_image[0].filename;
      }

      // If feature_image uploaded
      if (req.files.feature_image) {
        if (blog.feature_image) {
          const oldFeaturePath = path.join(__dirname, "../public/blog/", blog.feature_image);
          if (fs.existsSync(oldFeaturePath)) fs.unlinkSync(oldFeaturePath);
        }
        blog.feature_image = req.files.feature_image[0].filename;
      }
    }

    await blog.save();
    res.status(200).json({ msg: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};



//get table data

const getdatablog = async (req, res) => {
  try {
    const response = await Blog.find();
    if (!response) {
      res.status(404).json({ msg: "No Data Found" });
      return;
    }

    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(`project ${error}`);
  }
};

//delete

const deleteblog = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Blog.findOneAndDelete({ _id: id });

    if (!response) {
      res.status(404).json({ msg: "No Data Found" });
      return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(`project ${error}`);
  }
};

//for edit

// backend: controller
const getblogByid = async (req, res) => {
  try {
    const project = await Blog.findOne({ _id: req.params.id });

    if (!project) {
      return res.status(404).json({ msg: "No Data Found" });
    }

    res.status(200).json({ msg: project }); // msg is an object
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};




module.exports = {
  addBlog,
  categoryOptions,
  getcategoryOptionsTable,
  updateStatusblog,
  updateblog,
  getdatablog,
  deleteblog,
  getblogByid,
 
};
