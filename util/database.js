const Sequelize = require("sequelize");
const sequelize = new Sequelize('Chat_group','root','root123@',{
    dialect: 'mysql',
    host: 'localhost'
 })

module.exports = sequelize;
 