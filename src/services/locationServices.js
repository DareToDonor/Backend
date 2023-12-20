const { DonorLocation, Events } = require("../../models");
const { uploadFile } = require("../middlewares/uploadFile");

const addDonorLocation = async (newData, file) => {
  const pathName = "image/donorLocation";
  const{ publicUrl} = await uploadFile(file, pathName);
  const image = publicUrl;
  const status = 1;
  const donorLocation = await DonorLocation.create({
    ...newData, 
    status,
    image 
  });
  return donorLocation;
};

const getAllLocations = async (city) => {
  const donorLocations = await DonorLocation.findAll();
  return donorLocations;
}
const getLocationsById = async (id) => {
  const donorLocation = await DonorLocation.findByPk(id);
  if (!donorLocation) {
    throw Error("Donor Location Not Found")
  }
  return donorLocation;
}

const getAllLocationsByCity = async (cityName) => {
  const donorLocations = await DonorLocation.findAll({
    where: {
      city: cityName,
    }
  });
  return donorLocations;
}

const editLocation = async (status , id) => {
  const donorLocation = await DonorLocation.update(
    {status : status}, 
    {
    where: {
      id,
    }
  });
  return donorLocation;
}

module.exports = {
  addDonorLocation,
  getAllLocations,
  getLocationsById,
  getAllLocationsByCity,
  editLocation
};
