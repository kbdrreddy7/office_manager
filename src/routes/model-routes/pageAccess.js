const router = require("express").Router();
const {modelServices:{ pageAccessService }}=require("../../services")

//config

// validators

// models


// services

// middlewares
const auth=require("../../middlewares/auth")


// get all pageAccess-->  by profile
router.get(["/all"],auth,async(req,res,next)=>{
    try {
            let{user,query:{compress}}=req
        let data=await pageAccessService.getAllProfilesPageAccess({ user})
        if(compress)
        data=pageAccessService.customizeAllProfilesPageAccess(data)
     return res.status(200).send({status:true, data}) 
       
    } catch (error) {
        next(error)
    }
})


// get all roles pageAccess
router.get(["/roles"],auth,async(req,res,next)=>{
    try {
            let{user,query:{compress}}=req
        let data=await pageAccessService.getAllRolePageAccess({ user})

        if(compress)
            data=pageAccessService.customizeAllRolespageAccess(data)

        return res.status(200).send({status:true, data}) 
       
    } catch (error) {
        next(error)
    }
})


// get user(profile) page access or specific profile access
router.get(["/",'/:profileId?'],auth,async(req,res,next)=>{
    try {
            let{user,params:{profileId},query:{compress}}=req
        let data=await pageAccessService.getOneProfilePageAccess({profileId:profileId || user.profile_, user})
            if(compress)
               data=pageAccessService.customizeProfileAccess(data)
        return res.status(200).send({status:true, data}) 
       

    } catch (error) {
        next(error)
    }
})


// get one role pageAccess
router.get(["/roles/:roleId"],auth,async(req,res,next)=>{
    try {
            let{user,params:{roleId},query:{compress}}=req
        let data=await pageAccessService.getOneRolePageAccess({roleId, user})
        if(compress)
           data=pageAccessService.customizeRoleAccess(data)
     return res.status(200).send({status:true, data}) 
       
    } catch (error) {
        next(error)
    }
})




router.all("*",(req,res,next)=>{

    console.log(" route not found in page access  ",req.path)

    next()
})



module.exports =router;
