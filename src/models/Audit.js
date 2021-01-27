
const {sequelize, DataTypes,Model} = require('../config/db');

class Audit extends Model {}


// Extending Model and calling init(attributes, options)

 Audit.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    table: {
      type: DataTypes.STRING
    },
    field:{
      type: DataTypes.STRING

    },
    record_id:{
      type:DataTypes.STRING
    },
    old_value:{
      type:DataTypes.STRING
    },
    new_value:{
        type:DataTypes.STRING
      },

      //--------------
   
    created_by_:{
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
    modelName:'audit',
    timestamps: true,
    updatedAt:false,
    createdAt:'created_at',
    deletedAt:'deleted_at',
    paranoid:true, // dummy delete
  }
);



module.exports=Audit;