
const {sequelize, DataTypes,Model} = require('../config/db');

class PageAccess extends Model {}


// Extending Model and calling init(attributes, options)

 PageAccess.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    page_: {
      type:DataTypes.STRING
    },

    //-----------access info
    create: {
      type: DataTypes.BOOLEAN
    },
    read: {
      type: DataTypes.BOOLEAN
    },
    edit: {
      type: DataTypes.BOOLEAN
    },
    delete: {
      type: DataTypes.BOOLEAN
    },


    //--------------
   
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
    modelName:'page_access',
    timestamps: true,
    updatedAt:'updated_at',
    createdAt:'created_at',
    deletedAt:'deleted_at',
    paranoid:true,// dummy delete
  }
);



module.exports=PageAccess;