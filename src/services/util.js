
const qs=require('qs')
const {Sequelize:{Op}} = require('sequelize');
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const {mappings}=require("../config")


/** 
 * @param {String} queryString 
 *  parses/convert queryString to objects and sets default values for mandatory fields if they are null 
*/
const parseQueryString=(queryString)=>{

    let {
        raw,// query type raw:boolean
        offset,
        limit,
        order,
        group,
        attributes,
        exclude,
        include,// include other table data
        ... where
    }=qs.parse(queryString)

    raw=(raw==="false")?false:true
    include=(include==="true")

    if(!offset)
      offset=0

    if(!limit)
        limit=100

    offset=parseInt(offset)  // if string
    limit=parseInt(limit)  

    

    if(exclude)  // password,user_name
        exclude=exclude.split(",")
    else
        exclude=[]
    
    if(order) // updated_at:desc,socre:asc,name
        order=order.split(",").map(ele=>ele.split(":"))// [ [updated_at,desc],[score:asc],[name] ]

    if(!group)
    group=[]
    else group=group.split(',')     

    if(attributes)
       attributes=attributes.split(",")

    if(!where)
        where={}

    for (let field in where)
    {

        /* 
        // if field valle is an object...then that is operation based filter 
            e.g name:{
                like :'%ram%'
            }
        */ 
        if((!Array.isArray(where[field]))&&typeof where[field] ==="object")
        {
               let newObj={}
                for(let key in where[field])
                {
                    // replacing normal string(key) with sequelize op symbol
                    newObj[Op[key]]=where[field][key]
                }

                where[field]=newObj
        }
    }

    let options={
        offset,limit,
        order,
        group,
        attributes,
        exclude,
        include,
        where,
    }

    return options;

}


const convertDbQueryObject=({where={},attributes=[],exclude=[],offset=0,limit=100,order=[],group=[],raw=true,include=[]}={})=>{

    let queryObj={where, offset,limit,raw,include}


    if(limit<0 || limit===Infinity)
    delete queryObj.limit

     if(order&&order.length)
       queryObj.order=order;// if order is null/undefied/[]  we can't use limit

    if(group&&group.length)
    queryObj.group=group   
 
    // offset   ---> till offset(including) number ....rows are skipped

    if(exclude && exclude.length)
    queryObj.attributes={
        exclude
    }

    if(attributes && attributes.length)
        queryObj.attributes=attributes

    // if both exclude and attributes are exists...then attributes takes more importance
    
    return queryObj

}

let count=0;
const generateUniqueId=(prefix="")=>{

    let uid=`${prefix}${new Date().getTime()+(++count)}`
    if (count > 2000) // ~(approximately) 1057 objects are crated by node ..in 1 ms
       count=0
    return uid

}

const generateObjectId=(model)=>generateUniqueId(mappings[model.tableName]["idPrefix"])

const convertToToken=(payload)=>  jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'});

const decodeToken=(token)=>jwt.verify(token, process.env.JWT_SECRET);

const hashPassword=(password)=> bcrypt.hashSync(password, 10)

const comparePassswords=(password,hashPassword)=>bcrypt.compareSync(password,hashPassword)
/*   let hash=hashPassword("")
console.log("--------------------------------password hashing")
console.log(hash)  
 */

module.exports={
    hashPassword,comparePassswords,convertToToken,decodeToken,
    convertDbQueryObject,
    parseQueryString,
    generateObjectId
}