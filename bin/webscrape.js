/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */
// MIDDLEWARE IMPORTS TO POPULATE DB WITH SCHOLARSHIPS
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

// RUN WEBSCRAPE AS INSTANCE OF EXPRESS
const webscrape_app = express()

// INITIALISE MONGODB AND CONNECTION
require('./data/scholarboard-db');

// IMPORT MODELS
const Scholarship = require('../models/scholarship');

// DATA SCRAPE FROM SCHOLARSHIPS.COM
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');

// CONFIG MIDDLEWARE
webscrape_app.use(logger("dev")); // Use morgan logger for logging requests
webscrape_app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser for handling form submissions

let url = 'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-major/accounting-scholarships/%C2%A1adelante-fund-millercoors-colorado-scholarship/'
// # TODO: ASK DANI IF YOU CAN LOOP THROUGH AN ARRAY WITH .togo WITH NIGHTMARE
// let url = [
//   'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-major/accounting-scholarships/%C2%A1adelante-fund-millercoors-colorado-scholarship/',

// ]

nightmare
  .goto(url)
  .evaluate(() => {
    return document.body.innerHTML
  })
  .then((result) => {
    // LOADING HTML
    const $ = cheerio.load(result);

    const result_obj = {}; 

    // VARIBALES THAT NEED TO BE ADDED TO THE MODEL
    const scholName = $('#ulScholNameli.scholname div').text();
    const scholDeadline = $('#due-date-text').text(); 
    const scholFunding = $('award-info-row div').text();
    // SCHOLARSHIP CONTACT INFORMATION
    const scholContact1 = $('#liAddress1Text').text(); 
    const scholContact2 = $('#liAddress2Text').text();
    const scholContact3 = $('liCityStateZIPText').text(); 
    const scholContact4 = $('#ulScholDetails li:nth-child(8)').text(); 
    const scholContact = scholContact1 + scholContact2 + scholContact3 + scholContact4;
    // VARIBALE THAT WILL NEED TO BE QUIERIED AFTER SAVED TO DB
    const scholRequirements = $('#ulScholDetails li.scholdescrip div').text();

    // SAVE TEXT AS PROPERTY OF RESULT OBJ
    result_obj.name = scholName;
    result_obj.deadline = scholDeadline;
    result_obj.funding = scholFunding;
    result_obj.contactInfo = scholContact;
    result_obj.requirements = scholRequirements;

    Scholarship.create(result_obj)
      .then((dbSchol) => {
        console.log(dbSchol); 
      })
      .catch((err) => {
        return res.json(err);
      });
    res.send('Scrape complete');
  });

// START SERVER
const port = process.env.PORT_WEBSCRAPE;
webscrape_app.listen(port);
