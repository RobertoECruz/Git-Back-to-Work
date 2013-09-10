var email = require('mailer');

email.send({
  host: "smtp.sendgrid.net",
  port : "587",
  domain: "smtp.sendgrid.net",
  authentication: "login",
  username: 'Spinfusor',
  password: 'pennappsMOFO',
  to : "robertoecruz12@gmail.com",
  from : "robertoecruz12@gmail.com",
  subject : "node_mailer test email",
  body : "hello this a test email from the node_mailer",
}, function(err, result){
    if(err){
      console.log(err);
    }
  }
);
