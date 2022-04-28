const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../actions/http-error");
const User = require("../models/user");

//Register a new User
const signup = async (req, res, next) => {
  const { userName, phnNumber, email, password, gender } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Not able to register user. Please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Email exists, please try to login.", 422);
    return next(error);
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Not able to register user. Please try again later.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name: userName,
    email,
    password,
    image: "",
    phnNumber,
    gender,
    address: {
      address_one: "",
      city: "",
      state: "",
      country: "",
    },
  });

  try {
    createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Unable to register User, Please try again",
      403
    );
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    const error = new HttpError(
      "Unable to register User, Please try again",
      403
    );
    return next(error);
  }

  res.status(201).json({
    user: createdUser,
    token: token,
    expiresIn: 3600,
  });
};

//User SignIn /***********************************************************************************/
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login failed, please try again later", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid Email. Please enter a valid email or try to register instead.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Login failed, please try again later", 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Incorrect password. Please check and renter your password.",
      401
    );
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    const error = new HttpError("Unable to signin User, Please try again", 403);
    return next(error);
  }

  res.json({
    user: existingUser,
    token: token,
    expiresIn: 3600,
  });
};

//Social SignIn or SIgnUp /*******************************************************************************************************/
const socialAuth = async (req, res, next) => {
  const { email, name } = req.body;

  let authUser;

  try {
    authUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login failed, please try again later", 500);
    return next(error);
  }

  if (!authUser) {
    const createdUser = new User({
      name,
      email,
      password: "",
      image: "",
      phnNumber: 0,
      gender: "",
      address: {
        address_one: "",
        city: "",
        state: "",
        country: "",
      },
    });

    try {
      authUser = createdUser.save();
    } catch (err) {
      const error = new HttpError(
        "Unable to register User, Please try again",
        403
      );
      return next(error);
    }
  }

  res.status(201).json({
    user: authUser,
  });
};

// Get selected user /************************************************************************************************/
const getSelectedUser = async (req, res, next) => {
  const userId = req.params.userid;

  let selectedUser;

  try {
    selectedUser = await User.findOne({ _id: userId });
  } catch (err) {
    const error = new HttpError("Not able to get the selected user!", 500);
    return next(error);
  }

  res.json({ user: selectedUser });
};

// Update user profile /*************************************************************************************************/
const updateUserProfile = async (req, res, next) => {
  const {
    _id,
    name,
    email,
    phnNumber,
    gender,
    address_one,
    city,
    state,
    country,
  } = req.body;

  let selectedUser;

  try {
    selectedUser = await User.findOne({ _id: _id });
  } catch (err) {
    const error = new HttpError("Not able to get the selected user!", 500);
    return next(error);
  }

  if (!selectedUser) {
    const error = new HttpError(
      "Sorry can't update your profile, please try again!",
      500
    );
    return next(error);
  }

  selectedUser.name = name;
  selectedUser.email = email;
  selectedUser.phnNumber = phnNumber;
  selectedUser.gender = gender;
  selectedUser.address = {
    address_one: address_one,
    city: city,
    state: state,
    country: country,
  };

  try {
    selectedUser = await selectedUser.save();
  } catch (err) {
    const error = new HttpError(
      "Sorry can't update your profile, please try again!",
      500
    );
    return next(error);
  }

  res.json({ user: selectedUser });
};

// Update user image
const updateImage = async (req, res, next) => {
  const userId = req.params.userid;

  let selectedUser;

  try {
    selectedUser = await User.findOne({ _id: userId });
  } catch (err) {
    const error = new HttpError("Not able to get the selected user!", 500);
    return next(error);
  }

  selectedUser.image = req.file.path;

  try {
    selectedUser = await selectedUser.save();
  } catch (err) {
    const error = new HttpError(
      "Sorry can't update your profile image, please try again!",
      500
    );
    return next(error);
  }

  res.json({ user: selectedUser });
};

exports.signup = signup;
exports.login = login;
exports.socialAuth = socialAuth;
exports.getSelectedUser = getSelectedUser;
exports.updateUserProfile = updateUserProfile;
exports.updateImage = updateImage;
