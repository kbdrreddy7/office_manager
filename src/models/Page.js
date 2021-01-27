
const {sequelize, DataTypes,Model} = require('../config/db');

class Page extends Model {}


// Extending Model and calling init(attributes, options)

 Page.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING
    },
    api_url: {
        type: DataTypes.STRING
      },
    table: {
    type: DataTypes.STRING
    },

    //-------------
   
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
    modelName:'page',
    timestamps: true,
    updatedAt:'updated_at',
    createdAt:'created_at',
    deletedAt:'deleted_at',
    paranoid:true,
  }
);




module.exports=Page;