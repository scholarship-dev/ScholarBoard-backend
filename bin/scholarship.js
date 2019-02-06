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


