const bodyParser = require("body-parser");
const express = require('express');
var cors = require('cors')

const sequelize = require('./util/database');
const userRoutes = require('./router/userRouter')
const chatRouter = require("./router/chatRouter");
const groupRouter = require("./router/groupRouter");


const User = require("./models/userModel");
const Chat = require("./models/chat");
const Group = require("./models/groupModel");
const UserGroup = require("./models/userGroup");


const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());  //this is for handling jsons
app.use(express.static("Public"));

// app.use("/", userRouter);
app.use('/user', userRoutes);
app.use("/chat", chatRouter);
app.use("/group", groupRouter);



User.hasMany(Chat);
Chat.belongsTo(User);

Chat.belongsTo(Group);

User.hasMany(UserGroup);

Group.hasMany(Chat);
Group.hasMany(UserGroup);

UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);

//


sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })