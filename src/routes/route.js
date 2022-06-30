const express = require('express');
const { json } = require('express/lib/response');
const ucontroller = require('../controller/controller')
const middle = require('../middlewares/middl1')

const router = express.Router();




router.post('/functionup/colleges', ucontroller.createCollege)

router.post("/functionup/interns", middle.validator1, ucontroller.createIntern)

router.get("/collegeDetails", ucontroller.collegeDetails)


//router.get("/college-list", ucontroller.collegeList)

//router.get("/interlist", ucontroller.allInters)



module.exports = router;
// adding this comment for no reason