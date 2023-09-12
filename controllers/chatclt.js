
const User = require("../models/userModel");
const Chat = require("../models/chat");
const sequelize = require("../util/database");
const { Op } = require("sequelize");

exports.sendMessage = async (req, res, next) => {
  try {
    const email = req.body.email;
    console.log(email,"9 line");
    const user = await User.findAll({ where: { email } });
    // console.log(user[0].dataValues.id,"==================================");
    const id = user[0].dataValues.id;
    const nameU = user[0].dataValues.name; 
    await Chat.create({
      name: nameU,
      message: req.body.message,
      userId: id,
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
    const param = req.params.param;
    const messages = await Chat.findAll({
      where: {
        id: {
          [Op.gt]: param,
        },
      },
    });
    return res.status(200).json({ messages: messages });
  } catch (error) {
    console.log(error);
  }
};