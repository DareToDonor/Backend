const jwt = require('jsonwebtoken');
const { User } = require('../../models');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  const JWTToken = token.split(" ").pop();
  try {
    // Verify token
    const data = await jwt.verify(JWTToken, "capstone");
    // console.log(data.id);


    const userInfo = await User.findByPk(data.id, {
      attributes: { exclude: ["password","createdAt","updatedAt"] },
    });
    // console.log(userInfo);  

    if (!userInfo)
      return res.status(404).json({
        message: "User not found",
      });

    req.userInfo = {
      id: userInfo.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      bloodType: userInfo.bloodType 
    };
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      message: "Incorrect credential",
    });
  }
}