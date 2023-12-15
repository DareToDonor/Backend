const { donor_locations } = require("../../models");
const { uploadFile } = require("../middlewares/uploadFile");

const addDonorLocation = async (newData, file) => {
  const pathName = "image";
  const{ publicUrl} = await uploadFile(file, pathName);
  const image = publicUrl;
  const status = "buka";
  const donorLocation = await donor_locations.create({
    ...newData, 
    status,
    image 
  });
  console.log(donorLocation);
  return donorLocation;
};

getAllLocations = async () => {
  const donorLocations = await donor_locations.findAll();
  return donorLocations;
}
getLocationsById = async (id) => {
  const donorLocation = await donor_locations.findByPk(id);
  if (!donorLocation) {
    throw Error("Donor Location Not Found")
  }
  return donorLocation;
}

getAllByCity = async (cityName) => {
  const donorLocations = await donor_locations.findAll({
    where: {
      city: cityName,
    }
  });
  return donorLocations;
}

module.exports = {
  addDonorLocation,
};
