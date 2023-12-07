const { donor_locations } = require('../../models');


const addDonorLocation = async (newData) => {
  const donorLocation = await donor_locations.create(newData);
  return donorLocation;
}

module.exports = {
  addDonorLocation
}