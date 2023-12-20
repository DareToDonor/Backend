const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const checkDonorIdMiddleware = require('../middlewares/checkDonorId');

const {
    getAllDonorByStatus,
    createDonor,
    getDonor,
    editDonorStatus
} = require("../services/donorServices");

router.get("/:idDonor/:status",authMiddleware.checkLogin, async (req, res, next) => {
    try {
        // await authMiddleware.checkLogin(req, res, next);
        let donorId = parseInt(req.params.idDonor);
        let status = req.params.status;
        console.log(typeof req.params.status);
        
        let data = await getAllDonorByStatus(donorId, status); 
    
        let code = (!data) ? 400 : 200;
        let message = (!data) ?
            ((status) ? "No donors have been made" : "No donor schedule have been made") :
            "Data Retrieved Successfully";
    
        return res.status(code).send( {
            status: (!data ? "Failed" : "Success"), 
            message: message,
            data: (!data ? null : data)
        });
    } catch (error) {
        return res.status(400).send({
            status: "Failed",
            message: error.message
        });
    }
});

router.post("/:idDonor",authMiddleware.checkLogin, checkDonorIdMiddleware, async (req, res, next) => {
    try {
        // await authMiddleware.checkLogin(req, res, next);
        let donorId = parseInt(req.params.idDonor);
        let data = req.body;

        let createNewDonor = await createDonor(data, donorId);
        return res.status(200).send({
            status: "Success",
            message: "Data added successfully",
            data: createNewDonor
        });
    } catch (error) {
        return res.status(400).send({
            status: "Failed",
            message: error.message
        });
    }
});

router.get("/:donorCode",authMiddleware.checkLogin, checkDonorIdMiddleware, async (req, res, next) => {
    // await authMiddleware.checkLogin(req, res, next);
    // await checkDonorIdMiddleware(req, res, next);

    let codeDonor = req.params.donorCode;
    let data = await getDonor(codeDonor);

    let code = (!data) ? 400 : 200;
    let message = (!data) ? "Failed to fetch donor information" : "Successfully retrieved donor information";

    return res.status(code).send({
        status: (!data ? "Failed" : "Success"),
        message: message,
        data: (!data ? null : data)
    });
});

router.put("/:donorCode", authMiddleware.checkAdmin, async (req, res, next) => {

    let { donorStatus } = req.body;
    let codeDonor = req.params.donorCode;
    try {
        let newData = await editDonorStatus(codeDonor, donorStatus);

        return res.status(200).send({
            status: "Success",
            message: "Data Updated Successfully",
            data: newData
        });
    } catch (error) {
        return res.status(400).send({
            status: "Failed",
            message: error.message
        });
    }
});

module.exports = router;