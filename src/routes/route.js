const express = require('express');
const { json } = require('express/lib/response');
const ucontroller = require('../controller/controller')

const router = express.Router();




router.post('/functionup/colleges', ucontroller.createCollege)

router.post("/functionup/interns", ucontroller.createIntern)

router.get("/college-list", ucontroller.collegeList)

router.get("/interlist", ucontroller.allInters)
router.get("/filterByClg", ucontroller.filterByClg)





module.exports = router;
// adding this comment for no reason