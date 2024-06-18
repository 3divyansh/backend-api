const nodemailer = require
("nodemailer")
require("dotenv").config();

const sendEmail = (email) => {
	const transpoter = nodemailer.
	createTransport({
		service: "gmail",
		auth: {
                     user: process.env.EMAIL_USER,
                     pass:  process.env.EMAIL_PASSWORD,
              },
       })

	let mailingdetails = {
		from: process.env.EMAIL_USER,
              to: email,
              subject: "Testing for new email",
		message:"New message form nodemailer"
	}
             
	transpoter.sendMail(mailingdetails,function(err,data)
{
	       if(err)
              {
                     console.log(err)
              }
              else
              {
                     console.log("email sent")
              }
       
})
       
}

module.exports = 
       sendEmail;
