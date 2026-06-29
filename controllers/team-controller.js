const Team = require("../models/team-model");
const fs = require("fs");
const path = require("path");
// Utility: Create clean URL from title
function createCleanUrl(title) {
  let cleanTitle = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  return cleanTitle;
}
const {
  uploadToCloudinary
} = require("../utils/upload");

const deleteFromCloudinary = require("../utils/cloudinaryDelete");
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
const addTeam = async (req, res) => {
  try {
const { name,designation,createdBy } = req.body;
    const url = createCleanUrl(req.body.name);

   


 let mainImage = "";

if (req.files?.image?.[0]) {
  mainImage = await uploadToCloudinary(
    req.files.image[0].path,
    "team"
  );
}


    const now = new Date(); // ✅ Define now
    const createdAt = formatDateDMY(now); // 👈 formatted date
    const newTeam = new Team({
      name,
       designation,
      image: mainImage,
       status: 1, // default active
       createdAt, // ✅ Define now
       url,
       createdBy
    });

    await newTeam.save();

    res.json({
      msg: "Team added successfully",
      blog: newTeam,
    });
  } catch (error) {
  console.log(error);

  return res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
};

const updateTeam = async (req, res) => {
  try {

    const { name, designation } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success:false,
        message:"Team not found"
      });
    }

    if(name) team.name = name;
    if(designation) team.designation = designation;

    if(req.files?.image?.[0]){

      // delete old image
      if(team.image){
        await deleteFromCloudinary(team.image);
      }

      // upload new image
      team.image = await uploadToCloudinary(
          req.files.image[0].path,
          "team"
      );
    }

    await team.save();

    return res.json({
      success:true,
      message:"Team updated successfully",
      data:team
    });

  } catch(err){
      console.log(err);
      return res.status(500).json({
        success:false,
        message:err.message
      });
  }
}

// Update status
const updateStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    await Team.updateOne({ _id: id }, { $set: { status } }, { new: true });

    res.status(200).json({ msg: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Update client



// Get all clients
const getdata = async (req, res) => {
  try {
    const response = await Team.find();
    if (!response || response.length === 0) {
      return res.status(404).json({ msg: "No data found" });
    }

    res.status(200).json({ msg: response });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Delete client
const deleteteam = async(req,res)=>{
    try{

        const team = await Team.findById(req.params.id);

        if(!team){
            return res.status(404).json({
                success:false,
                message:"Team not found"
            });
        }

        if(team.image){
            await deleteFromCloudinary(team.image);
        }

        await Team.findByIdAndDelete(req.params.id);

        res.json({
            success:true,
            message:"Team deleted successfully"
        });

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

// Get client by ID
const getteamByid = async (req, res) => {
  try {
    const client = await Team.findOne({ _id: req.params.id });

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
  addTeam,
  updateStatus,
  updateTeam,
  getdata,
  deleteteam,
  getteamByid,
};
