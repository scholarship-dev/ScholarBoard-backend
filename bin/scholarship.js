// DATA SCRAPE FROM SCHOLARSHIPS.COM

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
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
  let desc = $('#ulScholDetails li.scholdescrip div').text();
  // SAVING TEXT INTO JSON
  let obj = { "text": desc }

  // SAVING JSON
  const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }
  for(let i = 0; i <= 1000; i += 1){
    storeData(obj, `lib/obj_${i}.json`);
  }
  
})
.catch(function (error) {
  console.error('Error:', error);
});


// const Nightmare = require('nightmare')
// const nightmare = Nightmare({ show: true })

// nightmare
// .goto('https://www.google.com/')
// .goto('https://www.google.com/')
// .click(':nth-child(1) > .srg > :nth-child(2) > :nth-child(1) > .rc > .r > :nth-child(1) > a')
// .click('.col2 > .noborder > a')
// .goto('https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory')
// .click('#ullist > :nth-child(1) > a')
// .goto('https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major')
// .click('#ullist > :nth-child(1) > a')
// .goto('https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/accounting')
// .click(':nth-child(1) > .scholtitle > a')
// .goto('https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/accounting/%C2%A1adelante-fund-millercoors-colorado-scholarship')
// .end()
// .then(function (result) {
//   console.log(result)
// })
// .catch(function (error) {
//   console.error('Error:', error);
// });

