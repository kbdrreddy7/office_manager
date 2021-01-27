const { isEmpty, isNumber } = require("../util")

module.exports = function TaskValidator(data) {
    let errors = {};
    let {
        name,user_name,password,employee_id,profile_,
        mobile_no,email,address,gender
     
    } = data


    let stringFields = {
        name,user_name,password,employee_id,
        mobile_no,email,address,gender,profile_
      
    }

    for (let key in stringFields)
        if (isEmpty(stringFields[key]))
            errors[key] = "Field is required"


     let numberFields={}
     
    
    for (let key in numberFields)
        if (isEmpty(numberFields[key]))
            errors[key] = "Number is required"
        else if(!isNumber(numberFields[key]))
            errors[key] = "only Number is allowed"

    

    return {
        errors,
        isValid: isEmpty(errors)
    };
};