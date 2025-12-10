const Client = require("../models/client-model");

// Utility: Create clean URL from title
function createCleanUrl(title) {
  let cleanTitle = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  return cleanTitle;
}

// Utility: Format date as dd-mm-yyyy hh:mm:ss
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

// Create new client
const addclient = async (req, res) => {
  try {
const { name,createdBy } = req.body;
    const url = createCleanUrl(req.body.name);

   

    // Handle uploaded files
    const mainImage = req.files["image"]
      ? req.files["image"][0].filename
      : "";
    const now = new Date(); // ✅ Define now
    const createdAt = formatDateDMY(now); // 👈 formatted date
    const newBlog = new Client({
      name,
      image: mainImage,
       status: 1, // default active
       createdAt, // ✅ Define now
       url,
       createdBy
    });

    await newBlog.save();

    res.json({
      msg: "Client added successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Add Client Error:", error);
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

const updateclient = async (req, res) => {
  try {
    const { name } = req.body;
    const blogId = req.params.id;

    const client = await Client.findById(blogId);
    if (!client) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // Update fields
    client.name = name || client.name;
    

    // 📂 Image upload handling
    if (req.files) {
      // If main_image uploaded
      if (req.files.image) {
        // delete old image if exists
        if (client.image) {
          const oldMainPath = path.join(__dirname, "../public/client/", client.image);
          if (fs.existsSync(oldMainPath)) fs.unlinkSync(oldMainPath);
        }
        client.image = req.files.image[0].filename;
      }

    
    }

    await client.save();
    res.status(200).json({ msg: "Blog updated successfully", client });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Update status
const updateStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    await Client.updateOne({ _id: id }, { $set: { status } }, { new: true });

    res.status(200).json({ msg: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Update client



// Get all clients
const getdata = async (req, res) => {
  try {
    const response = await Client.find();
    if (!response || response.length === 0) {
      return res.status(404).json({ msg: "No data found" });
    }

    res.status(200).json({ msg: response });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Delete client
const deleteclient = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Client.findOneAndDelete({ _id: id });

    if (!response) {
      return res.status(404).json({ msg: "No data found" });
    }

    res.status(200).json({ msg: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Get client by ID
const getclientByid = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id });

    if (!client) {
      return res.status(404).json({ msg: "No data found" });
    }

    res.status(200).json({ msg: client });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Export all
module.exports = {
  addclient,
  updateStatus,
  updateclient,
  getdata,
  deleteclient,
  getclientByid,
};
