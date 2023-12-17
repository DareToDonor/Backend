const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/uploadFile");

const { 
  addDonorLocation,
  getAllLocations,
  getLocationsById,
  getAllLocationsByCity,
  editLocation,
 } = require("../services/donorServices");

router.get("/", (req, res) => {
  const idUser = req.userInfo.id;
});



// Donor Locations
router.post("/locations", upload.single("image"), async (req, res) => {
  try {
    const newData = req.body;
    const file = req.file;
    const addNewLocations = await addDonorLocation(newData, file);
    return res.status(200).send({
      status: "success",
      message: "File uploaded successfully",
      addNewLocations,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

// edit 
router.put("/locations/:id", async(req,res) =>{
  try {
    const { status } = req.body;
    const editedLocation = await editLocation(Boolean(status),parseInt(req.params.id));

    return res.status(200).send({
      status: "success",
      message: "Data Updated Successfully",
      editedLocation,
    });
  } catch (error) {
    
  }
});

// get all locations

router.get("/locations", async (req, res) => {
  try {
    const { city } = req.query;
    if (city) {
      const getLocations = await getAllLocationsByCity(city);
      return res.status(200).send({
        status: "success",
        message: "Get Data Locations Success",
        getLocations,
      });
    }else {
      const getLocations = await getAllLocations();
      return res.status(200).send({
        status: "success",
        message: "Get Data Locations Success",
        getLocations,
      });
    }
    

  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: error.message,
    });
  }
});

// get locations by ID
router.get("/locations/:id", async (req,res) => {
  try {
    const getLocation = await getLocationsById(parseInt(req.params.id));
    return res.status(200).send({
      status: "success",
      message: "Get Data Locations Success",
      getLocation,
    });
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: error.message,
    });
  }
});




module.exports = router;
