const { donor } = require("../../models");
const { donor_done, donor_appointment, donor_failed } = require("../helper/models/donor/descriptionHelper");

const getAllDonorByStatus = async (userId, status) => {
    let donors = await donor.findAll({
        where: {
            idUser: userId,
            status: status
        }
    });

    return donors;
}

const createDonor = async (newData, userId) => {
    let status = false;
    let description = donor_appointment;
    let newDonorData = await donor.create({
        ...newData,
        userId,
        status,
        description
    });

    return newDonorData;
}

const getDonor = async (id) => {
    let donorData = await donor.findByPk(id);

    return donorData;
}

const editDonorStatus = async (id, donorStatus) => {
    let status = true;
    let description = (donorStatus) ? donor_done : donor_failed;

    let newDonorData = await donor.update({
        status: status,
        description: description
    }, {
        where: {
            idUser: id
        }
    });

    return newDonorData;
}

module.exports = { getAllDonorByStatus, createDonor, getDonor, editDonorStatus };