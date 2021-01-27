const isEmpty = value => (value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0));

const isNumber = value => !isNaN(parseInt(value))

const isBoolean = value => (typeof value==="boolean") || (value && (value === "true" || value === "false")) 


module.exports={
    isEmpty,isNumber,isBoolean
}