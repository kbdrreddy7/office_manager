const {Sequelize,DataTypes,Model,Op} = require('sequelize');

// https://sequelize.org/master/manual/model-basics.html

const sequelize = new Sequelize(process.env.DB_INSTANCE, process.env.DB_USER, process.env.DB_PWD, {
    dialect: process.env.DB_DIALECT,//'postgres', // 'mssql'
    host: process.env.DB_HOST,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
     // logging:  false,
      define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
      }
  })


module.exports = {sequelize,DataTypes,Model,Op};
