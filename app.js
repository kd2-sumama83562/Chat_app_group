const bodyParser = require("body-parser");
const express = require('express');
var cors = require('cors')

const sequelize = require('./util/database');
const userRoutes = require('./router/userRouter')
const chatRouter = require("./router/chatRouter");


const User = require("./models/userModel");
const Chat = require("./models/chat");


const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());  //this is for handling jsons
app.use(express.static("Public"));


app.use('/user', userRoutes)
app.use("/chat", chatRouter);



User.hasMany(Chat);
Chat.belongsTo(User);




sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })