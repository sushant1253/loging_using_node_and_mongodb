var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Schema = mongoose.Schema;
var urlencodedParser = bodyParser.urlencoded({ extended: false });




mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("database connected");
});

userSchema = new Schema( {
	
	
	email: String,
	
	password: String,
	
}),
User = mongoose.model('User', userSchema);

// var userData = {
//     email: "sushant",
//     password: "pass",
//   }

// User.create(userData, function (error, user) {
//     if (error) {
//       return next(error);
//     }
//   });

app.get('/', function (req, res) {
    res.sendfile('login.html')
  });



  app.post('/', urlencodedParser,function (req, res) {
    console.log(req.body.email);
    User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				console.log("Done Login");
				
				//console.log(req.session.userId);
				res.sendfile('Welcome.html');
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
  });
app.listen(3000, function () {
    console.log('Express app listening on port 3000');
  });