
const {sequelize, DataTypes,Model} = require('../config/db');

class ProfileRoles extends Model {}


// Extending Model and calling init(attributes, options)

// this is ternary(3) table  of profile and Role (m:n relation)
 ProfileRoles.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    profile_: {
      type: DataTypes.STRING
    },
    role_: {
        type: DataTypes.STRING
      },

      //-----------------
  
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
    modelName:'_profile_roles_', // ternary(3°) table  // u00B0 --> unicode for degree
    timestamps: true,
    updatedAt:'updated_at',
    createdAt:'created_at',
    deletedAt:'deleted_at',
    paranoid:true,// dummy delete
  }
);




module.exports=ProfileRoles;