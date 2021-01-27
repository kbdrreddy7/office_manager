const { isEmpty } = require("../util")

module.exports = function validator(data) {
    let errors = {};
    let {
        name
    } = data


    let stringFields = {
        name
    }

    for (let key in stringFields)
        if (isEmpty(stringFields[key]))
            errors[key] = "Field is required"
    

    return {
        errors,
        isValid: isEmpty(errors)
    };
};