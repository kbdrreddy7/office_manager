
const {sequelize, DataTypes,Model} = require('../config/db');

class RolePageAccess extends Model {}


// Extending Model and calling init(attributes, options)

// this is ternary(3) table  of profile and Role (m:n relation)
 RolePageAccess.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    page_access_: {
      type: DataTypes.STRING
    },
    role_: {
        type: DataTypes.STRING
      },

    //------------------
   
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
    modelName:'_role_page_access_', // ternary table
    timestamps: true,
    updatedAt:'updated_at',
    createdAt:'created_at',
    deletedAt:'deleted_at',
    paranoid:true,// dummy delete
  }
);




module.exports=RolePageAccess;