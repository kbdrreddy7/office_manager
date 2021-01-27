
// services
const utilService=require("../util")

// const auditService = require("./audit")
// causing circular dependecy...so import locally --in function

  let  auditService

/** 
 * @param {Object} obj 
 * @param {Object} user
 * @returns {Object} data base modal object with id and default fields
  */
const createObject=(model,obj,user={})=>{
 obj._id=utilService.generateObjectId(model)
 obj.created_by_=user._id
 obj.updated_by_=user._id
 obj.domain_=user.domain_
 obj.division_=user.division_

 return obj
}
 
const createObjects=(model,objArray,user={})=>{

  objArray=objArray.map((obj)=>createObject(model,obj,user))

  return objArray
}

/** 
 * @param {Object} obj 
 * @param {Object} model
 * @returns {Promise} data base modal object with id and default fields
  */
const saveObject=({obj,model})=>{
    return model.create(obj)
}

const saveObjects=({objArray,model})=>{
  return model.bulkCreate(objArray, {returning: true})
}

const updateOne=async({ obj,model,where={},user={},ingnoreAudit=false}={})=>{


  if(!(where&& Object.keys(where).length))
      throw "Conditions are required for update"

  where.domain_=user.domain_
  where.division_=user.division_    

  obj.updated_by_=user._id
  delete obj.updated_at

  let returnObj={}

  if((!ingnoreAudit) && process.env.AUDIT==="YES")
  {
    let old=await getOne({model,user,where,raw:true})
         
          if(!auditService)
             auditService=require("./audit")

      /* await */  auditService.trackAudit({model,oldObj:old,newObj:obj,user})
      returnObj={...old}

  }

  let count=await model.update(obj,{where});
  returnObj={...returnObj,...obj,updated_at:new Date()}

  return [count,returnObj]

}

const deleteOne=async({model,where={},user,ingnoreAudit=false}={})=>{


  if(!(where&& Object.keys(where).length))
  throw "Conditions are required for update"

  where.domain_=user.domain_
  where.division_=user.division_

  let obj={}
  obj.updated_by_=user._id
  obj.deleted_at=new Date()

  if((!ingnoreAudit) && process.env.AUDIT==="YES")
  {
    if(!auditService)
    auditService=require("./audit")

   await auditService.trackOneField({model,id:where._id,oldValue:null,field:'deleted_at',newValue:new Date(),user})
  }

  // model.destroy({where}) // we can use this but it won't update updated_by_

return model.update(obj,{where})

}

/** 
 * @param {Object} model 
 * @returns {Promise} data base modal object with id and default fields
*/

const getAll=({model,user, where={},attributes=[],exclude=[],offset=0,limit=100,order=[],raw=true,include=[],group=[]}={} )=>{

    where.domain_=user.domain_
    where.division_=user.division_

  let queryObj=utilService.convertDbQueryObject({ where,attributes,exclude,offset,limit,order,raw,include,group})
  return model.findAndCountAll(queryObj)

}

const getOne=({model,user, where={},attributes=[],exclude=[],raw=true,include=[]}={} )=>{

  where.domain_=user.domain_
  where.division_=user.division_

  let options={where,attributes,raw,include}

  if(exclude&&exclude.length>0)
      options.attributes={exclude} // exclude is not working

   if(Array.isArray(attributes)&&attributes.length==0)
      delete options.attributes
          
     
  return model.findOne(options)

}


// returns [obj,created]-> i.e [objecteInstace,boolean]
const upsertObj=async({model,obj,user,ingnoreAudit=false})=>{

  if(!obj._id)
     throw 'Id is required for upsert'

  obj.updated_by_=user._id
  obj.domain_=user.domain_
  obj.division_=user.division_

  // need to track audit
  if((!ingnoreAudit)&&process.env.AUDIT==='YES'){
      
      // https://sequelize.org/v3/docs/models-usage/

        let [result, created]=await model.findOrCreate({where:{_id:obj._id},defaults:obj})
        if(created){
          /* await */ model.update({created_by_:user._id},{where:{_id:obj._id}})

          result.created_by_=user._id
          return [result,created]
        }
        else{
           
          if(!auditService)
             auditService=require("./audit")
          /* await */ model.update(obj,{where:{_id:obj._id}})
          /* await */  auditService.trackAudit({model,oldObj:result,newObj:obj,user})
          return [obj,false]
        }

  }else{

    let [result,created]=await model.upsert(obj,{returning:true})

    return [result,created]

  }

}


const upsertObjs=async({ model,objArray,user})=>{
  /* 
  we use this generally for mobile(offiline) Api s

  to improve performance, we are not doing audit tracking 
                or // in audit track we don't track old value
  */

  /* 
      bulk upsert won't support for all databases by sequelize,
      so if there is no support for out db
           then we use normalUpsertObjs
        else specialUpsertObjs
  */

  //let resposes=await normalUpsertObjs({model,objArray,user,ingnoreAudit:true})

  //  postgresql supports bulk upsert
  let resposes =await specialUpsertObjs({model,objArray})

  return resposes


}


// this bulk upsert will work for all the data bases
const normalUpsertObjs=async({model,objArray,user,ingnoreAudit=true})=>{

    let resposes=[]

    for(let obj of objArray){

      let [respose]=await upsertObj({model,obj,user,ingnoreAudit})
      resposes.push(respose)

    }

    return resposes


}

// this bulk upsert will work with only few data base
const specialUpsertObjs=async({model,objArray/* ,user,ingnoreAudit=true */})=>{
/* 
  ref 
     https://stackoverflow.com/questions/48124949/nodejs-sequelize-bulk-upsert
     https://sequelize.org/master/class/lib/model.js~Model.html#static-method-bulkCreate
*/

   // this we'll use for mobile(offline) apis---> in mobile only we need to  do all changes( created_by_, updated_by_) 

         let attributes=Object.keys(model["rawAttributes"])

//  let resposes= await model.bulkCreate(objArray,{updateOnDuplicate:true}) // is not working

    let resposes= await model.bulkCreate(objArray,{updateOnDuplicate:attributes})

    return resposes


}

const getCount=({model, where={},attributes=[],exclude=[],offset=0,limit=100,order=[],raw=true,include=[],group=[]}={} )=>{

    let queryObj=utilService.convertDbQueryObject({ where,attributes,exclude,offset,limit,order,raw,include,group})
   
  return model.count(queryObj)

}



module.exports={
    createObject,createObjects,
    saveObject,saveObjects,
    updateOne,
    getAll,
    getOne,
    deleteOne,
    upsertObj,
    upsertObjs,
    normalUpsertObjs,
    specialUpsertObjs,

    getCount

    /* 
    getCount,
  */

}