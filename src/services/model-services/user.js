
// models
const User=require("../../models/User")
const {comparePassswords,hashPassword,generateObjectId}=require("../util")

// services
const globalService=require("./global")

const login=async({ user_name, password})=>{

   let user=await User.findOne({where: { user_name}})   
  
   if(!user)
     return ({status:false,user_name:"User Name doesn't exist"})

   if (comparePassswords(password, user.password)) {

    //----------need to upadte login_time
      await globalService.updateOne({
        obj:{login_time:new Date()},
        model:User,
        user,
        where:{user_name,_id:user._id},
        ingnoreAudit:true
      })
     return ({status:true,user})
   }
   
   return ({status:false,password:"Password is not matching"})

}

// save user object
const saveObject=async({obj,user})=>{

  obj._id=generateObjectId(User)
  obj.password=hashPassword(obj.password)
  obj.created_by_=user._id
  obj.updated_by_=user._id
  obj.domain_=user.domain_
  obj.division_=user.division_

  return User.create(obj)

}


const updateOne=({obj,where={},user={}})=>{

  where.division_=user.division_
  where.domain_=user.domain_

  if(obj.password)
  obj.password=hashPassword(obj.password)

  return globalService.updateOne({obj,model:User,where,user})  

}

module.exports={
    login,
    saveObject,
    updateOne
}