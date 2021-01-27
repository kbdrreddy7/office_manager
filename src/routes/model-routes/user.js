const router = require("express").Router();

//configs
const {mappings}=require("../../config")

// validators
const {userLoginValidator}=require("../../validators")

// models
const {User,LoginHistory}=require('../../models')

// validators
const {}=require("../../validators")

// services
const {userService,globalService}=require("../../services/model-services")
const {utilService}=require("../../services/")


// middlewares
const auth=require("../../middlewares/auth")


// login
router.post("/login",async(req,res,next)=>{

try {
                const { errors, isValid } = userLoginValidator(req.body);
            
                //user_name,password,app_type
                let { app_type, user_name, password}=req.body
    
            let loginHistory = {
                _id:utilService.generateObjectId(LoginHistory),
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                app_type,
                status:"FAIL",
                user_:null,
            }

            if (!isValid) {
                return res.status(400).json({status:false, errors});
            }


            let {status,user,...rest}=await userService.login({ user_name, password})
            if(status)
            {


                loginHistory.status="SUCCESS"
                loginHistory.created_by_=user._id
                loginHistory.domain_=user.domain_
                loginHistory.division_=user.division_


                await globalService.saveObject({obj:loginHistory,model:LoginHistory})


                let {
                    _id,user_name,profile_,employee_id,login_time,day_start_time,
                    first_name,last_name,domain_,division_
                    }=user


                const payload = {
                    _id,user_name,profile_,employee_id,login_time,day_start_time,
                    first_name,last_name,domain_,division_
                  }; 
              
                  let token=utilService.convertToToken(payload)
                 
              
                return res.set('Authorization', token).json({status:true, token  });
            }
            else {
                loginHistory.comment="wrong credentials"

                await globalService.saveObject({obj:loginHistory,model:LoginHistory})
                return res.status(400).send({status:false,errors:{...rest}})
            }

    } catch (error) 
    {
        next(error)

    }

})

// get all users
router.get(["/"], auth,  async(req,res,next)=>{
    try {
        
        let {query,user}=req

        let {model/* ,validator */,include}=mappings["user"]

        if(!model)
        {
            next()
            return;
        }

        let {include:includeAssociation,...options}=utilService.parseQueryString(query)

            if(includeAssociation)
            options.include=include

           options.exclude.push("password")


        
        let data=await globalService.getAll({model,user,...options})
        let {offset,limit}=options

     return res.status(200).send({status:true, data:data["rows"],count:data["count"],offset,limit}) 
       
  


    } catch (error) {
        next(error)
    }
   
})


// get one user
router.get(["/:id"],auth,async(req,res,next)=>{
    try {
        

        let {params:{id},query,user}=req

        let {model/* ,validator */,include}=mappings["user"]

        if(!model)
        {
            next()
            return;
        }

     let {include:includeAssociation,...options}=utilService.parseQueryString(query)
      
        if(includeAssociation)
        options.include=include

        options.where._id=id
        options.exclude.push("password") // exclude is not working for getOne

     let data=await globalService.getOne({model,user,...options})

       if(!data)
         return res.status(400).send({status:false,error:"Id doesn;t exists"}) 
       res.status(200).send({status:true, data:data})



    } catch (error) {
        next(error)
    }
})


// add one user
router.post("/",auth,async(req,res,next)=>{

    try {

        let {user,body}=req

        const {model,validator}=mappings["user"]

        if(!model)
          return next()

        let { errors,isValid}=validator(body) 
        if(!isValid)
           return res.status(400).send({status:false,errors})


        let {user_name}=body   
        let oldCount=await globalService.getCount({model,where:{user_name}})   
        if(oldCount>0)
            return res.status(400).send({status:false,errors:{user_name:"Uers Name already exists"}})



       let data=await userService.saveObject({obj:body,user}) 


        return res.json({status:true,data})
        
    } catch (error) {
        next(error)
    }
   
})

// update one user
router.put(["/:id"],auth,async(req,res,next)=>{
    try {
        
        let {params:{id},body:obj,user}=req


       let [updateCount,data]=await userService.updateOne({obj,where:{_id:id},user})  

       if(updateCount<=0)
         return res.status(400).send({status:false,error:"ID doesn't exists"})

       return res.json({status:true,data,message:`${updateCount} recored(s) updated successfully`})

    } catch (error) {
        next(error)
    }
})

// delete one user ( softdelete)
router.delete(["/:id"],auth,async(req,res,next)=>{
    try {
        
        let {params:{id},user}=req


        const {model}=mappings["users"]

        if(!model)
          return next()

     
       let updateCount=await globalService.deleteOne({model,where:{_id:id},user})  

       if(updateCount<=0)
         return res.status(400).send({status:false,error:"ID doesn't exists"})

       return res.json({status:true,message:`${updateCount} recored(s) deleted successfully`})

    } catch (error) {
        next(error)
    }
})

router.all("*", (req, res,next) => {
    console.log(" no route found in user WHS",req.path)
    next()
});


module.exports =router;
