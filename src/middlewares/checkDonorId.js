const { User } = require("../../models");

const checkIdDonorMiddleware = async (req, res, next) => {

  const userId = req.userInfo.id; // Assuming the donor ID is passed as a parameter
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  if (!user.idDonor || !user.NIK) {
    return res.status(400).json({ error: 'Please Insert Profile Info' });
  }

  next();
};

module.exports = checkIdDonorMiddleware;