const globalService=require("./global")
const utilService=require("../util")

const {Audit}=require("../../models")


// it just creates an object, but won't save in db
const createAudit=({oldVale,newValue,id,field,model,user})=>{


    return ({
        _id:utilService.generateObjectId(Audit),
        table:model.tableName,
        record_id:id,
        field,
        old_value:oldVale?oldVale.toString():oldVale,
        new_value:newValue?newValue.toString():newValue,
        created_by_:user._id,
        domain_:user.domain_,
        division_:user.division_
    })
}

// it'll tack the changes b/w two objs and saves them in db
const trackAudit=async({model,oldObj={},newObj={},user={}})=>{

    if(!(oldObj&&newObj))
        return;// 

    let audits=[]
    for(let key in newObj) 
    {
        if(newObj[key] && newObj[key] instanceof Date)
           newObj[key]=newObj[key].toISOString();

        if(newObj[key]!==oldObj[key])
         audits.push(createAudit({oldVale:oldObj[key], newValue:newObj[key],id:oldObj._id,field:key, model,user}))

    }
   if(audits.length>0)
   await globalService.saveObjects({objArray:audits,model:Audit}) 

}

// it'll tack one field changes and saves them in db
const trackOneField=async({oldVale,newValue,id,field,model,user})=>{

    if(!id)
      return;// throw Error("")

    let audit=createAudit({oldVale,newValue,id,field,model,user})

    await globalService.saveObject({obj:audit,model:Audit})

}


module.exports={
    trackAudit,
    trackOneField
}