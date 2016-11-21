var multer  = require('nodemailer');
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
var date = new Date('2016-11-22 08:00:00');
var mailTransport = multer.createTransport({
  host : 'smtp.126.com',
  post: '25',
  auth : {
      user : 'ran_ning@126.com',
      pass : 'test123'
  }
});
var options = {
  from           : '"csr" <ran_ning@126.com>',
  to             : '"wn" <172234437@qq.com>',
  subject        : '[抢票]蔡诗冉',
  text           : '[抢票]蔡诗冉',
  html           : '<h1>[抢票]蔡诗冉</h1>'
};

schedule.scheduleJob(date, function(){
  mailTransport.sendMail(options, function(err, msg){
      if(err){
          console.log(err);
      }
      else {
          console.log(msg);
      }
  });
});