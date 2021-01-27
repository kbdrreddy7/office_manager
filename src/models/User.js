
const {sequelize, DataTypes,Model} = require('../config/db');


class User extends Model {}



// Extending Model and calling init(attributes, options)

 User.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    // used for login
    user_name: {
      type: DataTypes.STRING,
      unique:true
    },
    password: {
      type: DataTypes.STRING
    },
    employee_id: {
      type: DataTypes.STRING
    },
    profile_: {
      type: DataTypes.STRING,
      
    },
    mobile_no: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    birth_date: {
      type: DataTypes.DATEONLY
    },
    joining_date: {
      type: DataTypes.DATEONLY
    },

    login_time: {
      type: DataTypes.DATE // date time
      },

    // to track office login(work) time
    day_start_time:{
    type: DataTypes.DATE 
    },
    day_end_time:{
      type: DataTypes.DATE 
    },
    profile_img_url:{
    type: DataTypes.STRING
    },

     //---
   
     created_by_:{
      type:DataTypes.STRING
    },
    updated_by_:{
      type:DataTypes.STRING
    },
    domain_:{
      type:DataTypes.STRING
      },
    division_:{
      type:DataTypes.STRING
    },
  

  },
  {
    sequelize,// connect db
    modelName:'user',
    timestamps: true,
    updatedAt:'updated_at',
    createdAt:'created_at',
    deletedAt:'deleted_at',
    paranoid:true,// dummy delete
  }
);


module.exports=User;