var express = require('express');
var bcrypt = require("bcrypt");
var userModel=require('../modules/user');
var helper = require('@sendgrid/mail');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');

}).get("/registration",(req,res)=>{
  res.render('registration');
}).post("/registration", async (req,res)=>{
    try{
      var hashPassword =  await bcrypt.hash(req.body.password,10);
      var userDetails =new userModel({
        UserEmail: req.body.email,
        Password: hashPassword,
        FirstName:req.body.fname,
        LastName:req.body.lname,
    });
      userDetails.save((err,req)=>{
        if(err) throw err;
        else{
          console.log("registered successfully");
          res.redirect("/");
        }
      })
    }catch{
        res.redirect('/registration');
    }  
}).post('/login', function (req, res, next) {
	//console.log(req.body);
	userModel.findOne({UserEmail:req.body.email},async function(err,data){
		if(data){
			
			if(await bcrypt.compare(req.body.password, data.Password)){
				res.render('home');
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
}).post('/upload',(req,res)=>{
  if(req.files){
    var file=req.files.filename,
    filename=file.name;
    var fileExtension = filename.replace(/^.*\./, '');
    console.log (fileExtension);
    if(fileExtension==='mp4'){
      file.mv('./upload/'+filename,(err)=>{
        if(err){
          console.log(err);
          res.send("error occured");
        }else{
          res.send("Done");
        }
    })
    }else{res.send('Unsupported format');}
  }
}).get('/forget',(req,res)=>{
  
  helper.setApiKey(process.env.SENDGRID_API_KEY);
  const msg={
    to:"avnishtaygi@gmail.com",
    from:"sunnytyagiofficial@gmail.com",
    subject: "Msg using Sendgrid",
    text:"Hii, Sunny Tyagi will become millionaire soon ",
    html:"<strong>and easy to do anywhere, even with node.js</html>",
  };
  helper.send(msg);
});

module.exports = router;
