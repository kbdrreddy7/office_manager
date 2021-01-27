
const {sequelize, DataTypes,Model} = require('../config/db');

class Profile extends Model {}

// Extending Model and calling init(attributes, options)

 Profile.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },

    //----------------
    
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
    modelName:'profile',
    timestamps: true,
    updatedAt:'updated_at',
    createdAt:'created_at',
    deletedAt:'deleted_at',
    paranoid:true,// dummy delete
  }
);


module.exports=Profile;