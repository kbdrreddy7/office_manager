const router = require("express").Router();


//config

// validators

// models


// services
const {pageDesignService}=require("../../services/model-services")

// middlewares
const auth=require("../../middlewares/auth")

// get all
router.get(["/all"],auth,async(req,res,next)=>{
    try {
            let{user}=req
        let data=await pageDesignService.getAllPageDesigns(user)

     return res.status(200).send({status:true, data}) 
       

    } catch (error) {
        next(error)
    }
})

// get one
router.get(["/one/:pageDesign"],auth,async(req,res,next)=>{
    try {
        

        let {params:{pageDesign},user}=req

        let data=await pageDesignService.getOnePageDesign(pageDesign,user)

       res.status(200).send({status:true, data:data})



    } catch (error) {
        next(error)
    }
})



router.all("*",(req,res,next)=>{

    console.log(" route not found in pageDesign  ",req.path)

    next()
})



module.exports =router;
