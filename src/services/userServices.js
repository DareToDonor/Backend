const { User } = require("../../models");


getProfileUser = async (idUser) => {
  const userInfo = await User.findByPk(idUser, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  return userInfo;
};

editProfileUser = async (idUser, data) => {
  // check user
  const checkUser = await User.findByPk(idUser);
  if (!checkUser) {
    throw Error("User Cannot be found");
  }
  if (data.NIK) {
    const idPart = idCard.slice(0, 5);
    const randomPart = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0");
    const donorId = idPart + randomPart;

    //insert data user
    const insertData = await User.update(
      { data, idDonor: donorId },
      {
        where: {
          id: idUser,
        },
      }
    );
    if (!insertData) {
      throw Error("Failed Update");
    }
    const updated = getProfileUser(idUser);
    return updated;
  }else{
    throw Error("Insert NIK");
  }
};

module.exports = {
  getProfileUser,
  editProfileUser,
};
