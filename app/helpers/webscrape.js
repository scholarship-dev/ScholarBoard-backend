//
// ─── DATA SCRAPE FROM SCHOLARSHIPS.COM ───────────────────────────────────────────
//

/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */
require('dotenv').config()
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');
const Scholarship = require('../models/scholarship');
require('../database/scholarboard-db');

// WEBSCRAPE HELPER FUNCTIONS
const helper = require('./tokenize');

let urls = [
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/accounting/aauw-return-to-learning-scholarships'
];

const nextLink = () => {
  const theURL = urls.pop();
  // scrape the web
  nightmare
    .goto(theURL)
    .evaluate(() => {
      return document.body.innerHTML;
    })
    .then((result) => {
      // LOADING HTML
      const $ = cheerio.load(result);

      // EXTRACTING NEEDED INFORMATON FROM HTML BODY
      const scholName = $('.eyebrow').next().text();
      const scholDeadline = $('#due-date-text').text();
      const scholFunding = $('.award-info-row :nth-child(1)').text();
      const scholContact1 = $('#liAddress1Text').text();
      const scholContact2 = $('#liAddress2Text').text();
      const scholContact3 = $('#liCityStateZIPText').text();
      const scholContact4 = $('#ulScholDetails li:nth-child(8)').text();
      const scholContact = scholContact1 + scholContact2 + scholContact3 + scholContact4;
      const scholRequirements = $('#ulScholDetails li.scholdescrip div').text();

      // Cleaning up scrapped data. The ORDER OF APPENDING TO ARRAY MATTERS!!
      const cleanData = helper.cleanTextBody([scholName, scholDeadline, scholFunding, scholContact, scholRequirements]);
      //const cleanDealineDate = helper.dateFormat(cleanData[1])
      // SAVE TEXT AS PROPERTY OF RESULT OBJ
      const result_obj = {
        name: cleanData[0],
        deadline: helper.extractDeadline(scholDeadline),
        funding: cleanData[2],
        contactInfo: cleanData[3],
        description: cleanData[4],
        grade: helper.extractGrade(scholRequirements),
        ethnicity: helper.extractEthnicity(scholRequirements),
        educationLevel: helper.extractEducationLevel(scholRequirements),
        gpa: helper.extractGPA(scholRequirements),
      };

      // CREATING AND SAVING A NEW SCHOLARSHIP OBJECT
      const scholarship = new Scholarship(result_obj);
      return scholarship.save()

    }).then((scholarship) => {
      console.log('scholarship saved')
      if (urls.length > 0) {
        nextLink()
      }
    }).catch((err) => {
      console.log(err);
    });
}

nextLink();
