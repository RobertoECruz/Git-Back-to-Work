var moment = require("moment");
var email = require('mailer');
var GitHubApi = require("github");
var commitDate, currentDate, momentDate, user_email;
var key = process.env.SGKEY;
var env_user = process.env.SGUSER;
var github = new GitHubApi({
  // required
  version: "3.0.0",
  // optional
  timeout: 5000

});
var fs = require("fs");

/*github.user.getEmails({
      user: "v"
}, function(err, res) {
      console.log(JSON.stringify(res));
});
*/

var array = fs.readFileSync("users.txt").toString().split('\n');

for(i = 0; i < array.length-1; i++){
  var a = function() {
    var array2 = array[i].split(" ");
    var gitUser = array2[0];
    console.log("i = "+i+" gitUser "+gitUser);

    github.events.getFromUser({
      user: gitUser
    }, function(err, res) {
      var userEmail = array2[1];
      console.log("userEmail " + userEmail);
      console.log("gitUser " + gitUser);
      /*console.log(JSON.stringify(res));*/
      /*user_email = res[0].payload.commits[0].author.email;*/
      /*user_email = "robertoecruz12@gmail.com"
      console.log(user_email);*/
      commitDate = new Date(res[0].created_at);
      moment_commitDate = moment(commitDate);
      console.log('Commit Date ' + commitDate);

      currentDate = moment().subtract('days',7).toDate();
      var moment_currentDate = moment(currentDate);
      console.log('Current Date ' + moment_currentDate +' Commit Date '+moment_commitDate);

      if(moment_currentDate >= moment_commitDate){
        console.log('Git back to work!');


    email.send({
      host: "smtp.sendgrid.net",
      port : "587",
      domain: "smtp.sendgrid.net",
      authentication: "login",
      username: 'Spinfusor',
      password: 'pennappsMOFO',
      to : userEmail,
      from : "robertoecruz12@gmail.com",
      subject : "Git Back to Work!",
      body : "Why aren't you coding?",
    }, function(err, result){
       if(err){ 
        console.log(err); 
       }
       });
      }
    });
  };
  a();
}
