
const User = require("../models/userModel");
const Chat = require("../models/chat");
const Group = require("../models/groupModel");


const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("getMessages", async (groupName) => {
    try {
      const group = await Group.findOne({ where: { name: groupName } });
      console.log(group.dataValues.id, "group.dataValues.id 20");
      const messages = await Chat.findAll({
        where: { groupId: group.dataValues.id },
      });
      io.emit("messages", messages);
    } catch (error) {
      console.log(error);
    }
  });
});

exports.sendMessage = async (req, res, next) => {
  try {
    const group = await Group.findOne({
      where: { name: req.body.groupName },
    });
//
    const email = req.body.email;
    const user = await User.findAll({ where: { email } });
    const id = user[0].dataValues.id;
    const nameU = user[0].dataValues.name; 
    console.log(group.dataValues.id, "group.dataValues.id =======")
    await Chat.create({
      name: nameU,
      message: req.body.message,
      userId: id,
      groupId: group.dataValues.id,
    });
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error" });
  }
};
