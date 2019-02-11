/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */

// DATA SCRAPE FROM SCHOLARSHIPS.COM
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');
const fs = require('fs');

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

    // VARIBALES THAT NEED TO BE ADDED TO THE MODEL
    // const scholName = $('#innercontent nth-child(2)').text();
    const scholName = $('.eyebrow').next().text();
    const scholDeadline = $('#due-date-text').text(); 
    const scholFunding = $('.award-info-row :nth-child(1)').text();
    // SCHOLARSHIP CONTACT INFORMATION
    const scholContact1 = $('#liAddress1Text').text(); 
    const scholContact2 = $('#liAddress2Text').text();
    const scholContact3 = $('#liCityStateZIPText').text(); 
    const scholContact4 = $('#ulScholDetails li:nth-child(8)').text(); 
    const scholContact = scholContact1 + scholContact2 + scholContact3 + scholContact4;
    // VARIBALE THAT WILL NEED TO BE QUIERIED AFTER SAVED TO DB
    const scholRequirements = $('#ulScholDetails li.scholdescrip div').text();

    // SAVE TEXT AS PROPERTY OF RESULT OBJ
    const result_obj = {
      name: scholName,
      deadline: scholDeadline,
      funding: scholFunding,
      contactInfo: scholContact,
      requirements: scholRequirements,
    };

    // STORE AS JSON
    const storeData = (data, path) => {
      try {
        fs.writeFileSync(path, JSON.stringify(data));
      } catch (err) {
        console.error(err)
      }
    };
    // for object in range(1, 1000)
    storeData(result_obj, `/data/${result_obj.name}.json`);
  })
  .catch((err) => {
    console.log(err)
  });
