const mongoose= require("mongoose");
mongoose.connect("mongodb+srv://sunnytyagi:iwttaiiit@cluster0-ahmh1.mongodb.net/test",{useNewUrlParser:true});

var conn =mongoose.Collection;

var userSchema= new mongoose.Schema({
    UserEmail:{type:String,unique:true},
    Password:String,
    FirstName:String,
    LastName:String,
});

var userModel =mongoose.model('User',userSchema);
module.exports=userModel;