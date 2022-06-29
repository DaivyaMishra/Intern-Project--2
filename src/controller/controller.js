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
    let data = await Interns.find({})

    res.send(data)
}


////////////////////////////////////////

  
     
    


/////////////////////////////////////////////


const collegeList = async function(req, res){

     let list = await Colleges.find().populate('interns')
      res.status(201).send(list)
   

}



module.exports.createCollege = createCollege
module.exports.allInters = allInters

module.exports.collegeList = collegeList

module.exports.createIntern  = createIntern 