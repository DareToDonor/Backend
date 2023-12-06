const { User } = require('../../models');

getProfileUser = async (idUser) => {
  const userInfo = await User.findByPk(idUser, {
    attributes: { exclude: ["password","createdAt","updatedAt"] },
  });
  return userInfo;
}

editProfileUser = async (idUser,data) => {
  // check user
  const checkUser = await User.findByPk(idUser);
  if (!checkUser) {
    throw Error("User Cannot be found");
  }

  //insert data user
  const insertData = await User.update(data, {
    where: {
      id : idUser
    }
  });
  if (!insertData) {
    throw Error('Failed Update')
  }

  const updated = getProfileUser(idUser);
  return updated;
}

module.exports = {
  getProfileUser ,
  editProfileUser
}