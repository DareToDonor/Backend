const { User } = require("../../models");
const { uploadFile } = require("../middlewares/uploadFile");

getProfileUser = async (idUser) => {
  const userInfo = await User.findByPk(idUser, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  return userInfo;
};

editProfileUser = async (idUser, data, file) => {
  // check user
  const checkUser = await User.findByPk(idUser);
  if (!checkUser) {
    throw Error("User Cannot be found");
  }
  if (file) {
    const pathName = "image/userProfile";
    const { publicUrl } = await uploadFile(file, pathName);
    const image = publicUrl;
    //insert data user
    await User.update(
      { imageProfile: image },
      {
        where: {
          id: idUser,
        },
      }
    );
  }

  if (data.NIK) {
    if (checkUser.NIK || checkUser.idDonor) {
      throw Error("User Already Have NIK and id Donor");
    }
    // create donorId
    const idPart = data.NIK.slice(0, 6);
    const randomPart = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0");
    const donorId = idPart + randomPart;
    

  
    //insert data user
    const insertData = await User.update(
      { ...data, idDonor: donorId},
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
  }
  

  const insertData = await User.update(
    data,
    {
      where: {
        id: idUser,
      },
    }
  );
  console.log(data.firstName);
  if (!insertData) {
    throw Error("Failed Update");
  }
  const updated = getProfileUser(idUser);
  return updated;
};

module.exports = {
  getProfileUser,
  editProfileUser,
};
