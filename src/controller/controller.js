const Colleges = require("../models/colleges");

const Interns = require("../models/newIntern");

//const Publisher = require("../models/newPublisher");



/////////////////////

const createCollege =  async function (req, res) {
    let data = req.body
    let newData = await Colleges.create(data)
   res.status(201).send({status: true, msg: newData})
};


//////////////////////////////


const createIntern =  async function (req, res) {
    let data = req.body
    let newData = await Interns.create(data)
   res.status(201).send({status: true, msg: newData})
};

//////////////////////


const allInters = async function(req, res){ 
    let data = await Interns.find().populate('CollegeId')


    res.send(data)
}


////////////////////////////////////////

  
     
    


/////////////////////////////////////////////


const collegeList = async function(req, res){

     let list = await Colleges.find().populate('interns')
      res.status(201).send(list)
   

}

const filterByClg = async function(req, res){
    let clg = req.query.name
    let data = await Colleges.findOne({name: clg, isDeleted: false})
    let students = await Interns.find({collegeId: data._id})
    console.log(students)
    data["interns"] = students
    res.status(201).send({status: true, data: data})
}



module.exports.createCollege = createCollege
module.exports.allInters = allInters
module.exports.filterByClg = filterByClg
module.exports.collegeList = collegeList
module.exports.createIntern  = createIntern 