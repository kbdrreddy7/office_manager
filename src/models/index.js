const Domain=require("./Domain")
const Division=require("./Division")
const User=require("./User")
const Profile=require("./Profile")

const Audit=require("./Audit")
const LoginHistory=require("./LoginHistory")
const Page=require("./Page")
const PageAccess=require("./PageAccess")
const PageDesign=require("./PageDesign")
const ProfileRoles=require("./ProfileRoles")
const Role=require("./Role")
const RolePageAccess=require("./RolePageAccess")





/* 
  1) 
  belongsTo and hasOne
  ---------------------

  source.belongsTo(Target,{foreignKey:"target_id",targetKey:"id"})
  // in source forign key field will be created
  // eg: Audit.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id' });
  // in Audit 'created_by_' will be created and referenced (foreign key )on '_id' from User


  source.hasOne(Target,{foreignKey:"target_id",targetKey:"id"})
  // in Target forign key field will be created
  // Profile.hasOne(User,{ foreignKey: 'profile_',targetKey: '_id' })
  // in User 'profile_' will be created and referenced (foreign key )on '_id' from Profile


  2)
   while creating bi-directionality association, it is giving error
   (e.g User, Profile), so create association in db, and assign manually in program


*/


//---------------------Association---------------------


//------------------------------ User
User.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id', as:'creator' });
User.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id', as:'updator' });
User.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });
User.belongsTo(Division, { foreignKey: 'division_',targetKey: '_id' });

/*
bi directionality is not working do it manually
User.belongsTo(Profile, { foreignKey: 'profile_',targetKey: '_id' }); // giving error

// create fk manually
ALTER TABLE user
    ADD CONSTRAINT user_profile__fkey FOREIGN KEY (profile_) REFERENCES profiles (_id)
	ON UPDATE CASCADE
    ON DELETE NO ACTION

*/

//--------------------------- Profile
Profile.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
Profile.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id',as:'updator' }); 
Profile.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });
Profile.belongsTo(Division, { foreignKey: 'division_',targetKey: '_id' });
//https://sequelize.org/master/manual/advanced-many-to-many.html
Profile.belongsToMany(Role,{through:ProfileRoles,foreignKey:'profile_',otherKey:'role_'})
// m:n bi-directionality

// the below some ways we have tried for 1:1 bi-directional associations

/* 1  working fine
Profile.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id' });
Profile.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id' });

User.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id' });
User.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id' });

*/

/* 2  working fine
User.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id' });
User.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id' });
User.belongsTo(Profile, { foreignKey: 'profile_',targetKey: '_id' });

*/


/* 3 Giving error
Profile.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id' });
Profile.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id' });  


User.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id' });
User.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id' });
User.belongsTo(Profile, { foreignKey: 'profile_',targetKey: '_id' });

*/

/* 4 Giving error -->  Cyclic dependency found

Profile.hasOne(User,{ foreignKey: 'profile_',targetKey: '_id' })
Profile.belongsTo(User, { foreignKey: 'us_created_by_',targetKey: '_id' });
Profile.belongsTo(User, { foreignKey: 'us_updated_by_',targetKey: '_id' });

*/

//---------------------------Audit
Audit.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
Audit.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });
Audit.belongsTo(Division, { foreignKey: 'division_',targetKey: '_id' })

//------------------------LoginHistory
LoginHistory.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
LoginHistory.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });
LoginHistory.belongsTo(Division, { foreignKey: 'division_',targetKey: '_id' })

//--------------------------Page
Page.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
Page.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id', as:'updator' });
Page.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });
Page.belongsTo(Division, { foreignKey: 'division_',targetKey: '_id' })

Page.hasMany(PageDesign, { foreignKey: 'page_',targetKey: '_id' });


//--------------------------PageAccess
PageAccess.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
PageAccess.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id', as:'updator' });
PageAccess.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });
PageAccess.belongsTo(Division, { foreignKey: 'division_',targetKey: '_id' })

PageAccess.belongsTo(Page, { foreignKey: 'page_',targetKey: '_id' });

//-------------------------PageDesign
PageDesign.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
PageDesign.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id', as:'updator' });
PageDesign.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });
PageDesign.belongsTo(Division, { foreignKey: 'division_',targetKey: '_id' })


//------------------------ProfileRoles
ProfileRoles.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
ProfileRoles.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id', as:'updator' });
ProfileRoles.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });
ProfileRoles.belongsTo(Division, { foreignKey: 'division_',targetKey: '_id' })

ProfileRoles.belongsTo(Profile, { foreignKey: 'profile_',targetKey: '_id' });
ProfileRoles.belongsTo(Role, { foreignKey: 'role_',targetKey: '_id' });

//------------------------Role

//https://sequelize.org/master/manual/advanced-many-to-many.html

Role.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
Role.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id', as:'updator' });
Role.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });
Role.belongsTo(Division, { foreignKey: 'division_',targetKey: '_id' })
//Role.belongsToMany(Profile,{through:ProfileRoles,foreignKey:'role_',otherKey:'profile_'})
Role.belongsToMany(PageAccess,{through:RolePageAccess,foreignKey:'role_',otherKey:'page_access_'})
// m:n bi-direction
//-------------------------RolePageAccess



RolePageAccess.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
RolePageAccess.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id', as:'updator' });
RolePageAccess.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });
RolePageAccess.belongsTo(Division, { foreignKey: 'division_',targetKey: '_id' })

/* 
RolePageAccess.belongsTo(PageAccess, { foreignKey: 'page_access_',targetKey: '_id' });
RolePageAccess.belongsTo(Role, { foreignKey: 'role_',targetKey: '_id' });
 */

//----------------------------Division
/* Bi-directionality not supporing ---> create manually
Division.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
Division.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id', as:'updator' }); 
*/
Division.belongsTo(Domain, { foreignKey: 'domain_',targetKey: '_id' });

//----------------------------Doman
/* Bi-directionality not supporing ---> create manually
Domain.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id',as:'creator' });
Domain.belongsTo(User, { foreignKey: 'updated_by_',targetKey: '_id', as:'updator' }); 
*/


module.exports={
    Audit, User,Profile,LoginHistory, PageDesign, Domain,Division,
    Page,PageAccess,Role,ProfileRoles,RolePageAccess
}
