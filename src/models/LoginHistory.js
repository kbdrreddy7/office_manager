
const {sequelize, DataTypes,Model} = require('../config/db');

class LoginHistory extends Model {}

// Extending Model and calling init(attributes, options)

LoginHistory.init(
{
    _id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    ip: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    app_type:{
        type: DataTypes.STRING
    },
    comment:{
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
        modelName:'login_history',
        timestamps: true,
        updatedAt:false,
        createdAt:'created_at',
        deletedAt:'deleted_at',
        paranoid:true,

    }
)



module.exports=LoginHistory;
