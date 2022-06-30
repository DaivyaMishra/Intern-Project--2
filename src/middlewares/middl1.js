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
          if(!(isString(data[i]))) throw {status: false, err: "PLEASE ENTER STRING AT" + " " + i}
      }
      if(!validateEmail(data["email"])) throw {status: false, err: "PLEASE ENTER A RIGHT EMAIL"}
      
      let isValid = await colleges.findOne({CollegeId: data.CollegeId})
      if(!isValid) throw { status: false, err: "COLLEGE ID IS NOT VALID"}



     /////////////email varification////////////

    

  // checking for the duplicate mail ID

  let mail = await Interns.findOne({ email: data.email });
  if (mail) throw { status: false, msg: "Mail Id is already exist" };


     /////////////mobile number validation///////

    const isMobileAlreadyUsed = await Interns.findOne({ mobile: data.mobile });
    // console.log(isMobileAlreadyUsed)
    if (isMobileAlreadyUsed) throw { status: false, msg: ` this Mobile is already registered` }

 


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
