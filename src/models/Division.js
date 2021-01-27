
const {sequelize, DataTypes,Model} = require('../config/db');

class Division extends Model {}

// Extending Model and calling init(attributes, options)

 Division.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    div_name: {
      type: DataTypes.STRING
    },

    //-------------
   
    domain_:{
      type:DataTypes.STRING
    },
    created_by_:{
      type:DataTypes.STRING
    },
    updated_by_:{
      type:DataTypes.STRING
    }
  
  },
  {
    sequelize,// connect db
    modelName:'division',
    timestamps: true,
    updatedAt:'updated_at',
    createdAt:'created_at',
    deletedAt:'deleted_at',
    paranoid:true,// dummy delete
  }
);


module.exports=Division;