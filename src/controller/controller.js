const Colleges = require("../models/colleges");

const Interns = require("../models/newIntern");

//const Publisher = require("../models/newPublisher");
///////////////////////


/////////////////////

const createCollege =  async function (req, res) {
    try {
        let data = req.body
    if (!data.name || data.name.trim().length == 0) throw { status: false, message: "College Name is requierd"}
    
    if (!data.name.match(/^[a-z]+$/i)) throw {status: false, err: "College name must be in anabbreviated format"}
    if (!data.logoLink) throw { status: false, err: 'logoLink is required' }

    ////////Bekar chis////

    if (!(data.fullName.length > 0)) throw { status: false, err: "fullName is required" }

    let Collegefullname = await Colleges.findOne({ fullName: data.fullname, isDeleted: false })
    if (Collegefullname) throw { status: false, err: `${fullName} already exist` }

    

   // if(!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(data.logoLink))) throw {status: false, err: "LogoLink Is Not Valid"}
   let newData = await Colleges.create(data)
    res.status(201).send({status: true, msg: newData})
    } catch(err){  
        res.status(400).send({status: false, msg: err})
    }
};

//////////////////////////////


const createIntern =  async function (req, res) {
    let data = req.body
    let newData = await Interns.create(data)
   res.status(201).send({status: true, msg: newData})
};

//////////////////////


const allInters = async function(req, res){ 
    try { 
        let data = await Interns.find().populate('CollegeId')
    if(!data.length > 0) throw {status: false, err: "No Interns Found"}
    res.status(200).send(data)
    }catch(err) {
         res.status(400).send({status: false, msg: err})
    }

}


////////////////////////////////////////

  
     
    


/////////////////////////////////////////////


const collegeList = async function(req, res){

     let list = await Colleges.find()
      res.status(201).send(list)
   

}

const collegeDetails = async function(req, res){
    try {
          let clg = req.query.name
        if (!clg.match(/^[a-z]+$/i)) throw {status: false, err: "College name must be in anabbreviated format"}
        
    
    let data = await Colleges.findOne({name: clg, isDeleted: false})
    let students = await Interns.find({CollegeId: data._id})
    

    let obj = {Interns: [...students]}
    let newData = {data, ...obj}
    res.status(201).send({status: true, data: newData})
}catch(err){

    res.status(500).send({status: false, msg: err})
}

}
module.exports.createCollege = createCollege
module.exports.allInters = allInters
module.exports.collegeDetails = collegeDetails
module.exports.collegeList = collegeList
module.exports.createIntern  = createIntern 