const nodemailer=require("nodemailer")

const sendMail=({userName,password,from,to,subject,textMessage,htmlMessage})=>{

    let  smtpTransport = nodemailer.createTransport({
        host: 'smtp.googlemail.com', // Gmail Host
        port: 535, // Port
        secure: false, // this is true as port is 465...else false
        auth: {
            user: userName,
            pass: password
        }
    });

    var mailOptions = {
        from: from,
        to: to, 
        subject: subject,
        text: textMessage,
       // html:htmlMessage

    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            //res.redirect('/');
            console.log(" success ")
        }
    });
}

module.exports={
    sendMail
}