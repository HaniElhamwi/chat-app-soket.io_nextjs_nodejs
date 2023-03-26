const router = require("express").Router();
const {
  login,
  register,
  setAvatar,
  getAllUsers,
} = require("../controllers/userCtrl");

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/all-users/:id", getAllUsers);
module.exports = router;
