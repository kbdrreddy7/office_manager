require("./config")
const cors = require('cors');
var fs = require('fs');
var http = require('http');
var https = require('https');

const express = require('express');
const app = express();


// config
const {sequelize} = require('./config/db');

// services
const {errorHandlerService}=require("./services")


// middlewares
app.use(cors());
app.use(express.json({ extened: false }));


/* const fileUpload = require('express-fileupload');
const bodyParser=require("body-parser")
app.use(fileUpload()); // here enable app to use fileupload
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
 */


 //Connecte Database
 sequelize.authenticate()
  .then(() => {
          // to sync all
          //sequelize.sync()  
          //sequelize.sync({force:true})


        // to sync specific model  
        
          /* const {Page}=require("./models")
          Page.sync({force:true})    */
       

         /* 
          const {PageDesign}=require("./models")
          PageDesign.sync()  */
           
   

    console.log('database connection has been established successfully.');

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
  });  
   


//--------------------https setup-----------------

if( process.env.NODE_ENV==="PRODUCTION" || process.env.NODE_ENV==="TESTING")
{
  
 
  var key  = fs.readFileSync(process.env.KEY_PATH); 
  var cert = fs.readFileSync(process.env.CERT_PATH);
  
  
  var ca1 = fs.readFileSync(process.env.CA1_PATH)
  var ca2 = fs.readFileSync(process.env.CA2_PATH)
  
  var credentials = {key, cert,ca:[ca1,ca2],passphrase:process.env.passphrase}

  
  
  const httpsPort=process.env.HTTPS_PORT || 5443
  var httpsServer = https.createServer(credentials, app); 
     httpsServer.listen(httpsPort,()=>{
       console.log(" https sever running on port",httpsPort)
     });

}
if( process.env.NODE_ENV==="DEVELOPMENT" || process.env.NODE_ENV==="TESTING")
{
  //-------------http setup------------------
    const httpPort = process.env.HTTP_PORT || 5009
    var httpServer = http.createServer(app);
        httpServer.listen(httpPort,()=>{
          console.log(" http server is running on ",httpPort)
        });

}

/* 
app.listen(process.env.PORT, () => {
    console.log('Server Running On Port :', process.env.PORT);
  });
   */


app.get("/",(req,res)=>{
  console.log(req.hostname)
  return res.status(200).send('<h1>Wel come to app</h1>')
})// serve static files
app.use(["/api"], require("./routes"));




// global error handlers
//------------------------------------------>
// it is a middleware
app.use( (err, req, res, next)=> {
  if(err)
  {
    errorHandlerService.handleError(err)
    res.status(500).send({status:false, error:"Server is not responding-->"+err.message })
  }

  });


  process.on('uncaughtException', function(error) {
    errorHandlerService.handleError(error)
   });


   process.on('unhandledRejection', function(error){
    errorHandlerService.handleError(error)

 });

