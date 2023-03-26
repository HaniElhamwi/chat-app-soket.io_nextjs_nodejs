const {
  getAllMessages,
  addMessage,
} = require("../controllers/messagesController");

const router = require("express").Router();

router.post("/add-message", addMessage);
router.post("/get-messages", getAllMessages);

module.exports = router;
