const { donor, DonorLocation, User } = require("../../models");
const {
  donor_done,
  donor_appointment,
  donor_failed,
} = require("../helper/models/donor/descriptionHelper");

const getAllDonorByStatus = async (idDonor, status) => {
    const user = await getIdUserFromIdDonor(idDonor);
    const donors = await donor.findAll({
    where: {
      idUser: user.id,
      status: status,
    },
    include: DonorLocation,
  });

  return donors;
};

const createDonor = async (newData, idDonor) => {
  //donorCode
  const today = new Date();
  const options = { timeZone: "Asia/Jakarta" };
  const dayMapping = ["S", "M", "T", "W", "T", "F", "S"];
  const dayChar = dayMapping[today.getDay()];
  const date = today.toLocaleDateString("en-US", options).replace(/\//g, ""); // Format: MM/DD/YYYY
  const time = today
    .toLocaleTimeString("en-US", { ...options, hour12: false })
    .replace(/:/g, "");
  const donorCode = `${dayChar}-${date}${time}`;

    //get UserID
    const user = await getIdUserFromIdDonor(idDonor);

  let status = false;
  let description = donor_appointment;
  let newDonorData = await donor.create({
    ...newData,
    idUser : user.id,
    status,
    donorCode,
    description,
  });

  return newDonorData;
};

const getDonor = async (donorCode) => {
  let donorData = await donor.findOne({ where : {donorCode : donorCode}});

  return donorData;
};

const editDonorStatus = async (donorCode, donorStatus) => {
  let status = Boolean(donorStatus);
  let description = status ? donor_done : donor_failed;

  let newDonorData = await donor.update(
    {
      status,
      description,
    },
    {
      where: {
        donorCode: donorCode,
      },
    }
  );
  if (!newDonorData) {
    throw Error("Failed Update");
  }
  
  let donorData = await donor.findOne({ where : {donorCode : donorCode}});

  return donorData;
};

const getIdUserFromIdDonor = async (idDonor) => {
  const user = await User.findOne({
    where: { idDonor},
  });
  return user
};

module.exports = {
  getAllDonorByStatus,
  createDonor,
  getDonor,
  editDonorStatus,
};
