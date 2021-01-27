
const loggerService=require("./logger")
const mailService=require("./mailService")

const handleError=(error)=>{

    // do handling error here
    console.log(" error ->",error)
    if( typeof error==='object')
    loggerService.log(error.stack || error.message)
    else loggerService.log(error)


    /*  mailService.sendMail({
    userName:"kbdrreddy10@gmail.com",
    password:"***",
    from:"kbdrreddy10@gmail.com",
    to:"kbdrreddy10@gmail.com",
    subject:"Mail from Node",
    textMessage:"Hello",
    htmlMessage:"<h1>Hello</h1>"
    })
 */

}

module.exports={
    handleError
}