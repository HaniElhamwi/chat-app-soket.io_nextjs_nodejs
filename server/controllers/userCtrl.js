const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const userCheck = await User.findOne({ username });
    if (userCheck)
      return res.status(400).json({ msg: "Username already exists" });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.status(400).json({ msg: "Email already exists" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: passwordHash,
      username,
    });
    console.log(user);
    delete user.password;
    res.status(200).json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) res.send("incorrect username or password");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.send("Incorrect password");
    delete user.password;
    console.log("login", user);
    res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    res.json({
      isSet: !!userData.avatarImage,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
  getAllUsers,
  setAvatar,
};
