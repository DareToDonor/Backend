const { User } = require("../../models");
const { bcrypt, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (data) => {
  if (
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.password ||
    !data.phoneNumber 
  ) {
    throw Error("All field must be filled");
  }
  const checkEmail = await User.findOne({
    where: {
      email: data.email,
    },
  });
  if (checkEmail) {
    throw Error("Email has been used");
  }
  const password = bcrypt.hashSync(data.password, 10);
  data.password = password;

  const user = await User.create(data);
  if (!user) {
    throw Error("Error Cannot be created");
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    bloodType: user.bloodType,
  };
};


// Login

const login = async (data) => {
  //check field
  if (!data.email || !data.password
  ) {
    throw Error("Please Insert Username and Password");
  }
  // check email
  const user = await User.findOne({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw Error("Email Not Found");
  }

  const isPasswordCorrect = compareSync(data.password, user.password);

  if (!isPasswordCorrect){
    throw Error("Wrong Password");
  };

  const token = jwt.sign({ id: user.id,username: user.username }, 'capstone');

  return token;
}

module.exports = {
  register,
  login
};
