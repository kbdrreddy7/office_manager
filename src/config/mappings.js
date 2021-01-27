
//models
const {
    Profile,Domain,Division,
    User,LoginHistory,Audit,PageDesign,
    Role,ProfileRoles,PageAccess,RolePageAccess

}=require("../models")

//validators
const {userValidator,profileValidator}=require("../validators")

// key is route name 
const mappings={
    [Audit.tableName]:{model:Audit,idPrefix:"AU"},
    [Domain.tableName]:{model:Domain,idPrefix:"DM"},
    [Division.tableName]:{model:Division,idPrefix:"DV"},
    [User.tableName]:{model:User,validator:userValidator,idPrefix:"US",
                            include:[
                                {
                                model:Profile,attributes:['_id',"name"]
                                }
                            ]
                     },
    [Profile.tableName]:{model:Profile,validator:profileValidator,idPrefix:"PR"},
    [LoginHistory.tableName]:{model:LoginHistory,idPrefix:"LH"},
    [PageDesign.tableName]:{model:PageDesign,idPrefix:"PD"},
    [Role.tableName]:{model:Role,idPrefix:"RL"},
    [ProfileRoles.tableName]:{model:ProfileRoles,idPrefix:"PR"},
    [PageAccess.tableName]:{model:PageAccess,idPrefix:"PA"},
    [RolePageAccess.tableName]:{model:RolePageAccess,idPrefix:"RP"}




   
  
    
}
module.exports=mappings