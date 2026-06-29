const express = require("express");
const router = express.Router();

const ClientController = require("../controllers/team-controller"); // ✅ Proper naming
const { blogSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

// ✅ Middlewares
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, "../public"))); // corrected static path
const { teamUpload } = require("../utils/upload");

// ✅ File upload handling (if needed later)


// Routes
router.post(
  "/addTeam",
  teamUpload.fields([
    { name: "image", maxCount: 1 },
  ]),
  ClientController.addTeam
);

router.patch(
  "/updateTeam/:id",
  teamUpload.fields([
    { name: "image", maxCount: 1 },
  ]),
  ClientController.updateTeam
);
router.get("/getdatateam", ClientController.getdata);
router.get("/getteamByid/:id", ClientController.getteamByid);
router.delete("/deleteteam/:id", ClientController.deleteteam);
router.patch("/update-statusteam", ClientController.updateStatus);



module.exports = router;
