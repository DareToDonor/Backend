const { User } = require('../../models');

getProfileUser = async (idUser) => {
  const userInfo = await User.findByPk(idUser, {
    attributes: { exclude: ["password","createdAt","updatedAt"] },
  });
  return userInfo;
}

module.exports = {
  getProfileUser ,
}