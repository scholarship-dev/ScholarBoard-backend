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
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/accounting/aauw-return-to-learning-scholarships',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/accounting/abc-humane-wildlife-control-and-prevention-inc-academic-scholarship',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/accounting/accounting-and-financial-womens-alliance-scholarship-bellevue-chapter',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/accounting/acf-barnes-w-rose-jr-and-eva-rose-nichol-scholarship-program',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/accounting/acf-trythall-family-scholarship-for-excellence-in-continuing-education',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/amtie-scholarships/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/5-strong-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/acf-barnes-w-rose-jr-and-eva-rose-nichol-scholarship-program/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/acf-david-r-woodling-memorial-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/acf-robby-baker-memorial-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/beta-gamma-recruitment-grant/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/betsy-niles-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/better-brothers-la-book-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/betty-harlan-memorial-art-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/beulah-frey-environmental-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/bev-granger-memorial-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/billy-smith-memorial-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/cameron-impact-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/catharine-lealtad-scholarships/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/cbc-spouses-education-scholarship/',
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-grade-level/high-school-scholarships/charles-lee-anderson-memorial-scholarship/'
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
      const clean_data = helper.cleanTextBody([scholName, scholDeadline, scholFunding, scholContact, scholRequirements]);

      // SAVE TEXT AS PROPERTY OF RESULT OBJ
      const result_obj = {
        name: clean_data[0],
        deadline: new Date(helper.dateFormat(clean_data[1])),
        funding: clean_data[2],
        contactInfo: clean_data[3],
        description: clean_data[4],
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
