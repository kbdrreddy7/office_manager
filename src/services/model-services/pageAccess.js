const {PageAccess,Profile, ProfileRoles,RolePageAccess,Page, Role}=require("../../models")
const globalService=require("./global")



const getAllProfilesPageAccess=async({user,where={}}={})=>{

   
    // https://sequelize.org/master/manual/advanced-many-to-many.html

    let {rows}=await globalService.getAll({
        model:Profile,
        user,
        where,
        attributes:['name','_id'],
        raw:false,
        include:[
            {
                model:Role,
                attributes:['name','_id'],
                /*
                    if we don't pass an empty array of attributes --> 
                    then it'll  fetch all 'through' (_profile_roles_) attributes 
                */
                through: { attributes: []},
                include:[
                    {
                        model:PageAccess,
                        attributes:['create','read','edit','delete'],
                        required:true,
                        include:[
                            {
                                 model:Page,
                                 attributes:['name','api_url'],
                                
                            }
                        ],
                        through: {attributes: []}
    
                    }
                ],
               
            }
        ]


    })      

    return rows;
}

const getOneProfilePageAccess=async({profileId,user})=>{

    let rows=await getAllProfilesPageAccess({where:{'_id':profileId},user})

    return rows[0] || {} // fiirst one

}

const getAllRolePageAccess=async({where={},user}={})=>{
    let {rows}=await globalService.getAll({
            
        model:Role,
        user,
        where,
        attributes:['name'],
        raw:false,
        include:[
            {
                model:PageAccess,
                attributes:['_id','page_','create','read','edit','delete'],
                required:true,
                include:[
                    {
                         model:Page,
                         attributes:['_id','name','api_url'],
                        
                    }
                ],
                through: {attributes: []}

            }
        ],
       
    })

    return rows
}

const getOneRolePageAccess=async({roleId,user})=>{
    let rows=await getAllRolePageAccess({where:{'_id':roleId},user})

    return rows[0] || {}
}


//=================Formatting access Object


const accessArrayToObject=(accessArray)=>{

    let accessObj={}

    for(let access of accessArray)
    {
        if(!accessObj[access.page.api_url])
            accessObj[access.page.api_url]={name:access.page.name}
        
         if(access['create'])
         accessObj[access.page.api_url]['create']=true
         if(access['read'])
         accessObj[access.page.api_url]['read']=true
         if(access['edit'])
         accessObj[access.page.api_url]['edit']=true
         if(access['delete'])
         accessObj[access.page.api_url]['delete']=true
    }

    return accessObj

}

const customizeProfileAccess=(profileAccessObj)=>{

            let accessArray=[]
            if(profileAccessObj['dataValues'])
            for(let role of profileAccessObj['dataValues']['roles'])
                     if(role['dataValues'])
                     accessArray.push(...role['dataValues']['page_accesses'])

        profileAccessObj['dataValues']['page_accesses']= accessArrayToObject(accessArray)        


        return profileAccessObj


}

const customizeRoleAccess=(roleAsseccObj)=>{

    if(roleAsseccObj['dataValues'])
    roleAsseccObj['dataValues']['page_accesses']=accessArrayToObject(roleAsseccObj['dataValues']['page_accesses'])

    return roleAsseccObj;
}

const customizeAllProfilesPageAccess=(profileAccessObj)=>{
   
    for(let profile of profileAccessObj)    
         customizeProfileAccess(profile)
    return profileAccessObj

}

const customizeAllRolespageAccess=(roleAsseccObj)=>{

    for(let role of roleAsseccObj)    
         customizeRoleAccess(role)
    return roleAsseccObj
}


module.exports={
    getAllProfilesPageAccess,
    getOneProfilePageAccess,
    getAllRolePageAccess,
    getOneRolePageAccess,

    //-----------------formatting methods
    accessArrayToObject,
    customizeProfileAccess,
    customizeRoleAccess,
    customizeAllProfilesPageAccess,
    customizeAllRolespageAccess
}