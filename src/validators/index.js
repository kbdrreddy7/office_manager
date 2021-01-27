const utilValidator=require("./util")
const userLoginValidator=require("./userLogin")



//------------
const userValidator=require("./models/user")
const profileValidator=require("./models/profile")


module.exports={
    utilValidator,userLoginValidator,



    //---------------
    userValidator,profileValidator
}