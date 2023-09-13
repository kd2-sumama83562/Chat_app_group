
const User = require("../models/userModel");
const Chat = require("../models/chat");
const sequelize = require("../util/database");
const Group = require("../models/groupModel");
const { Op } = require("sequelize");

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

exports.getMessages = async (req, res, next) => {
  try {
    // const messages = await Chat.findAll();
    // const param = req.params.param;
    const param = req.query.param;
    console.log(req.query.groupName);
    const group = await Group.findOne({
      where: { name: req.query.groupName },
    });
    const messages = await Chat.findAll({
      where: {
        [Op.and]: {
          id: {
            [Op.gt]: param,
          },
          groupId: group.dataValues.id,
        },
      },
    });
    return res.status(200).json({ messages: messages });
  } catch (error) {
    console.log(error);
  }
};