const router = require("express").Router();


//config
const {mappings}=require("../../config")

// validators

// models

// services
const {utilService}=require("../../services")
const {globalService}=require("../../services/model-services")

// middlewares
const auth=require("../../middlewares/auth")

// get all
router.get(["/:route"],auth,async(req,res,next)=>{
    try {
        
        let {params:{ route},query,user}=req

        let configDetails=mappings[route]

        if(!configDetails)
        {
            next()
            return;
        }

        let {model/* ,validator */,include}=configDetails


        let {include:includeAssociation,...options}=utilService.parseQueryString(query)

            if(includeAssociation)
            options.include=include
        
        let data=await globalService.getAll({model,user,...options})
        let {offset,limit}=options

     return res.status(200).send({status:true, data:data["rows"],count:data["count"],offset,limit}) 
       
  


    } catch (error) {
        next(error)
    }
})

// get one
router.get(["/:route/:id"],auth,async(req,res,next)=>{
    try {
        

        let {params:{route,id},query,user}=req

        let configDetails=mappings[route]

        if(!configDetails)
        {
            next()
            return;
        }

        let {model/* ,validator */,include}=configDetails

     let {include:includeAssociation,...options}=utilService.parseQueryString(query)
      
        if(includeAssociation)
        options.include=include

        options.where._id=id

     let data=await globalService.getOne({model,user,...options})

       if(!data)
         return res.status(400).send({status:false,error:"Id doesn't exists"}) 
       res.status(200).send({status:true, data:data})



    } catch (error) {
        next(error)
    }
})


// add one
router.post(["/:route"],auth,async(req,res,next)=>{
    try {
        
        let {params:{route},body,user}=req


          let configDetails=mappings[route]

          if(!configDetails)
          {
              next()
              return;
          }
  
          let {model ,validator }=configDetails


          console.log("-----------globalService ",globalService)

        let { errors,isValid}=validator?validator(body):{isValid:true} 
        if(!isValid)
           return res.status(400).send({status:false,errors})

          let obj=globalService.createObject(model,body,user) 

       let data=await globalService.saveObject({obj,model})  

       return res.json({status:true,data})


    } catch (error) {
        next(error)
    }
})

// update one
router.put(["/:route/:id"],auth,async(req,res,next)=>{
    try {
        
        let {params:{route,id},body,user}=req

          let configDetails=mappings[route]

          if(!configDetails)
          {
              next()
              return;
          }
  
          let {model}=configDetails

     
       let [updateCount,data]=await globalService.updateOne({obj:body,model,where:{_id:id},user})  

       if(updateCount<=0)
         return res.status(400).send({status:false,error:"ID doesn't exists"})

       return res.json({status:true,data, message:`${updateCount} recored(s) updated successfully`})

    } catch (error) {
        next(error)
    }
})

// delete one ( soft delete based on deleted_at)
router.delete(["/:route/:id"],auth,async(req,res,next)=>{
    try {
        
        let {params:{route,id},user}=req


        let configDetails=mappings[route]

        if(!configDetails)
        {
            next()
            return;
        }

        let {model}=configDetails

     
       let updateCount=await globalService.deleteOne({model,where:{_id:id},user})  

       if(updateCount<=0)
         return res.status(400).send({status:false,error:"ID doesn't exists"})

       return res.json({status:true,message:`${updateCount} recored(s) deleted successfully`})

    } catch (error) {
        next(error)
    }
})

router.post("/:route/upsert",auth,async(req,res,next)=>{
    try {
        let {params:{route},body,user}=req


        let configDetails=mappings[route]

        if(!configDetails)
        {
             next()
            return;
        }

        let {model}=configDetails


        if(!(body))
           return res.status(400).send({status:false,message:"req body should not be empty"})

    
        let [data]=await globalService.upsertObj({model,obj:body,user,ingnoreAudit:false})

        return res.json({status:true,data})


    } catch (error) {
        next(error)
    }
})

router.post("/:route/bulk_upsert",auth,async(req,res,next)=>{
    try {
        let {params:{route},body,user}=req


        let configDetails=mappings[route]

        if(!configDetails)
        {
            next()
            return;
        }

        let {model}=configDetails


        if(!(body&&Array.isArray(body)&&body.length))
           return res.status(400).send({status:false,message:"req body( array of objects ) should not be empty"})

           
        let responses=await globalService.upsertObjs({model,objArray:body,user})

        return res.json({status:true,data:responses})


    } catch (error) {
        next(error)
    }
})



router.all("*",(req,res,next)=>{

    console.log(" route not found in global WHS ",req.path)

    next()
})



module.exports =router;
