// DATA SCRAPE FROM SCHOLARSHIPS.COM
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

nightmare
.goto('https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-major/accounting-scholarships/%C2%A1adelante-fund-millercoors-colorado-scholarship/')
.evaluate(function(){
  return document.body.innerHTML
})
.then(function (result) {
  //loading html body to cheerio
  console.log(result);
  let $ = cheerio.load(result);
})
.catch(function (error) {
  console.error('Error:', error);
});


