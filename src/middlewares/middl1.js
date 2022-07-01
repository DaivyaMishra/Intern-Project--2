const colleges = require("../models/colleges");
const Interns = require("../models/newIntern");


const isvalidkey = function(body){
    return Object.keys(body).length>0
}

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const isString = function(str){
    return typeof(str)=="string"
}

////////////////////////////////////////////////////////////////////////////

const validator1 = async function(req, res, next){
    try {
        let data = req.body
        const strFields = ["name", "email", "mobile"]
      if(!isvalidkey(data)) throw {status: false, err: "Check every keys"}

      for(i of strFields){
          if(!data[i])  throw {status: false, err: i + " " + " is required"}
          if(!(isString(data[i]))) throw {status: false, err: "PLEASE ENTER STRING AT" + " " + i}
      }
      if(!validateEmail(data["email"])) throw {status: false, err: "PLEASE ENTER A RIGHT EMAIL"}

    //   if(!data.name) throw {status: false, err: "Name is required"}
    //   if(!data.email) throw {status: false, err: "Email is required"}
    //   if(!data.mobile) throw {status: false, err: "Mobile is required"}

      let isValid = await colleges.findOne({name: data.CollegeName})
      if(!isValid) throw { status: false, err: "COLLEGE NAME IS NOT VALID"}
      if(!(data.mobile.length > 0)) throw {status: false, err: "Mobile is required"}

     /////////////email varification////////////
     ////checking for the duplicate mail ID/////
    let mail = await Interns.findOne({ email: data.email });
    if (mail) throw { status: false, msg: "Mail Id is already exist" };
     /////////////mobile number validation///////
     if (!data.mobile.trim().match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) throw {status: false, err: "PLease enter a Correct Mobile Number"}
     const isMobileAlreadyUsed = await Interns.findOne({ mobile: data.mobile });
       // console.log(isMobileAlreadyUsed)
    if (isMobileAlreadyUsed) throw { status: false, msg: `this Mobile is already registered`}

 
///////////////////////////////

         next()
         
    } catch(err){
        if(err.status===false){
            res.status(400).send({status: false, msg: err})
        }
        else {
            res.status(500).send({status: false, msg: err})
        }
}
}
module.exports.validator1 = validator1
