const express = require('express');
var bodyParser = require('body-parser'); 

const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




mongoose.connect("mongodb+srv://ddutta706:Kp9AhM76EvHSQyYk@cluster0.levfaad.mongodb.net/college-Intern", {
    useNewUrlParser: true
}).then(() => console.log("mongdb conection succsesfull"))
.catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

