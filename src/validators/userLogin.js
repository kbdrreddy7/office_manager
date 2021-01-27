const {isEmpty} = require('./util');

const validate=(data)=>{
  let errors = {};

  let {user_name,password,app_type}=data

  let stringFields = {
    user_name,password,app_type
}

for (let key in stringFields)
    if (isEmpty(stringFields[key]))
        errors[key] = "Field is required"


  return {
    errors,
    isValid: isEmpty(errors)
  };


}

module.exports =validate