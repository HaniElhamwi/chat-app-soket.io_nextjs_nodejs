const Messages = require("../models/messageModel");

const addMessage = async (req, res, next) => {
  try {
    console.log(req.body);
    const { from, to, message } = req.body;
    const messageData = await Messages.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });
    if (!messageData) {
      res.status(400).json({ message: "Message not sent" });
    } else {
      res.status(200).json({ message: "Message sent" });
    }
    return null;
  } catch (err) {
    next(err);
  }
};

const getAllMessages = async (req, res, next) => {
  const { from, to } = req.body;
  try {
    console.log(from, to);
    const messages = await Messages.find({
      users: { $all: [from, to] },
    }).sort({ createdAt: 1 });
    const projectMessages = messages?.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      };
    });
    res.status(200).json(projectMessages);
    console.log(projectMessages);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addMessage,
  getAllMessages,
};
