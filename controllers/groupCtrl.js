const path = require("path");
const User = require("../models/userModel");
const Group = require("../models/groupModel");
const UserGroup = require("../models/userGroup");
const { Op } = require("sequelize");

exports.createGroup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findAll({ where: { email } });

    const groupName = req.body.groupName;
    const admin = user[0].dataValues.name;
    const members = req.body.members;

    const group = await Group.create({ name: groupName, admin: admin });

    const invitedMembers = await User.findAll({
      where: {
        email: {
          [Op.or]: members,
        },
      },
    });

    (async () => {
      await Promise.all(
        invitedMembers.map(async (user) => {
          const response = await UserGroup.create({
            isadmin: false,
            userId: user.dataValues.id,
            groupId: group.dataValues.id,
          });
        })
      );
     console.log(user[0].dataValues.id," line no ===== 36");
      await UserGroup.create({
        isadmin: true,
         userId: user[0].dataValues.id,
        groupId: group.dataValues.id,
      });
    })();

    res.status(201).json({ group: group.dataValues.name, members: members });
  } catch (error) {
    console.log(error);
  }
};

exports.addToGroup = async (req, res, next) => {
  try {
    const groupName = req.body.groupName;
    const members = req.body.members;

    const group = await Group.findOne({ where: { name: groupName } });
    if (group) {
      const admin = await UserGroup.findOne({
        where: {
          [Op.and]: [{ isadmin: 1 }, { groupId: group.id }],
        },
      });
      if (admin.userId == req.user.id) {
        const invitedMembers = await User.findAll({
          where: {
            email: {
              [Op.or]: members,
            },
          },
        });

        await Promise.all(
          invitedMembers.map(async (user) => {
            const response = await UserGroup.create({
              isadmin: false,
              userId: user.dataValues.id,
              groupId: group.dataValues.id,
            });
          })
        );
        res.status(201).json({ message: "Members Added Successfully!" });
      } else {
        res.status(201).json({ message: "Only Admins Can Add New Members" });
      }
    } else {
      res.status(201).json({ message: "Group doesn't exists!" });
    }
  } catch (error) {
    console.log(error);
  }
};
//
exports.getGroups = async (req, res, next) => {
  try {
    const email = req.headers.email;
    console.log(email, " email1 95 getGroup");
    const user = await User.findAll({ where: { email } });

    console.log(user[0].dataValues.id,"100 ==============");
   
    const groups = await Group.findAll({
      attributes: ["name", "admin"],
      include: [
        {
          model: UserGroup,
          where: { userId: user[0].dataValues.id},
        },
      ],
    });
    res.status(200).json({ groups: groups });
  } catch (error) {
    console.log(error);
    
  }
};