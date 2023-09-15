const bodyParser = require("body-parser");
const express = require('express');
var cors = require('cors')
const path = require("path");

const sequelize = require('./util/database');
const userRouter = require('./router/userRouter')
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

app.use('/user', userRouter);
app.use("/chat", chatRouter);
app.use("/group", groupRouter);

app.use('/', (req, res)=>{
    try{
        console.log("url", req.url);
        res.sendFile(path.join(__dirname, `${req.url}`));
    }
    catch(e){
        console.log("er is from here 38 aap.js")
    }
})




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