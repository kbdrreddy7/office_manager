
const {sequelize, DataTypes,Model} = require('../config/db');

class Domain extends Model {}

// Extending Model and calling init(attributes, options)

 Domain.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    dom_name: {
      type: DataTypes.STRING
    },

    //------------------------
    
    created_by_:{
      type:DataTypes.STRING
    },
    updated_by_:{
      type:DataTypes.STRING
    }
  

  },
  {
    sequelize,// connect db
    modelName:'domain',
    timestamps: true,
    updatedAt:'updated_at',
    createdAt:'created_at',
    deletedAt:'deleted_at',
    paranoid:true,// dummy delete
  }
);


module.exports=Domain;