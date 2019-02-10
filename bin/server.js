// MIDDLEWARE IMPORTS TO POPULATE DB WITH SCHOLARSHIPS
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parse');
const logger = require('morgan');
const mongoose = require('mongoose');

// IMPORT MODELS
const Scholarship = require('../models/scholarship');
const Student = require('../models/student');

// INITIALISE MONGODB AND CONNECTION
require('./data/scholarboard-db');

// DATA SCRAPE FROM SCHOLARSHIPS.COM
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');

// INITIALISE EXPRESS
let app = express();

// CONFIG MIDDLEWARE
app.use(logger("dev")); // Use morgan logger for logging requests
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser for handling form submissions
app.use(express.static("public")); // Use express.static to serve the public folder as a static directory

let url = 'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-major/accounting-scholarships/%C2%A1adelante-fund-millercoors-colorado-scholarship/'
// # TODO: ASK DANI IF YOU CAN LOOP THROUGH AN ARRAY WITH .togo WITH NIGHTMARE
// let url = [
//   'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-major/accounting-scholarships/%C2%A1adelante-fund-millercoors-colorado-scholarship/',

// ]

nightmare
.goto(url)
.evaluate(function(){
  return document.body.innerHTML
})
.then(function (result) {
  //LOADING HTML 
  let $ = cheerio.load(result);

  // VARIBALES THAT NEED TO BE ADDED TO THE MODEL
  const scholName = $('#ulScholNameli.scholname div').text();
  const scholDeadline = $('#due-date-text').text()
  const scholFunding = $('award-info-row div').text();
  // VARIBALE THAT WILL NEED TO BE QUIERIED
  const scholDescription = $('#ulScholDetails li.scholdescrip div').text();
  Scholarship.create(result)
    .then((scholName) => {

    })
  
})
.catch(function (error) {
  console.error('Error:', error);
});

// START SERVER
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


