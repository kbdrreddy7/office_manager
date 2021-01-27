
const {sequelize, DataTypes,Model} = require('../config/db');

class PageDesign extends Model {}


// Extending Model and calling init(attributes, options)

 PageDesign.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    page_: {
      type:DataTypes.STRING
    },
  
    //-----------section info
    section: {
      type: DataTypes.STRING
    },
    section_no: {
      type: DataTypes.INTEGER
    },

    //--------- field info
    field:{
      type: DataTypes.STRING
    },
    label:{
      type: DataTypes.STRING
    },
    table_seq:{ //----------- seq in table view
      type:DataTypes.INTEGER
    },
    section_seq:{//------   seq with in its section
      type:DataTypes.INTEGER
    },

    type:{
      type: DataTypes.STRING
    },
    value:{
      type: DataTypes.STRING
    },

    readonly:{   // always disabled
      type:DataTypes.BOOLEAN
    },
    only_insert:{  // only creation time we can inset(add), but can't edit later
      type:DataTypes.BOOLEAN
    },
    // if a field is-->  readonly=fale  &  only_insert=false  then that field is editable
   
   
    control_field:{
      type:DataTypes.STRING
    },
    validations:{
        type:DataTypes.STRING
    },
    mandatory:{
      type:DataTypes.BOOLEAN
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
    modelName:'page_design',
    timestamps: true,
    updatedAt:'updated_at',
    createdAt:'created_at',
    deletedAt:'deleted_at',
    paranoid:true,// dummy delete
  }
);



module.exports=PageDesign;