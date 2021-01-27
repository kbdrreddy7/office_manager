const fs=require("fs")
let LOGS_PATH=process.env.LOGS_PATH

/**
 * @param {String} msg log text that needs to be write
 * @param {String} fileName  file name...in which log text should be recorded
*/
const writeToFile=(msg,fileName)=>{

    let today=new Date()
    today=today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+" "+today.toLocaleTimeString()

    msg=today+"-->"+msg
    fs.writeFile(fileName,msg,(err)=>{
        if(err)
        console.log("err",err)
    })

}

/**
 * @param {String} msg  text that needs to be append
 * @param {String} fileName  file name...in which log text should be recorded
*/
const appendToFile=(msg,fileName)=>{
    let today=new Date()
    today=today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+" "+today.toLocaleTimeString()

    msg=today+"-->"+msg
    // appending in new line
    // first are is file name
    fs.appendFile(fileName,`\n${msg}`,(err)=>{
        if(err)
        console.log(err)
    })

    fs.appendFile
}


/**
 * @param {String} msg log text that needs to be append
 * @param {String}[fileName] if not passed...today date file will be created
*/
const log=(msg,fileName,logToConsole=false)=>{

    let today=new Date()
    if(!fileName)
      fileName=today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+".log"


      fileName=LOGS_PATH+"/"+fileName

      if(fs.existsSync(fileName))
        appendToFile(msg,fileName)
      else writeToFile(msg,fileName)

     if(logToConsole)
       console.log(msg) 

}

module.exports={log}