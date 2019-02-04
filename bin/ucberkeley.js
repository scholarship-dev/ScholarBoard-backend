// DATA FROM SCHOLARSHIPS.COM
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

nightmare
.goto('https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-major/accounting-scholarships/%C2%A1adelante-fund-millercoors-colorado-scholarship/')
.end()
.then(function (result) {
  console.log(result)
})
.catch(function (error) {
  console.error('Error:', error);
});

var urlWeb = "url";
var selectCity = "#ddl_city"

nightmare
.goto(urlWeb)
.wait(selectCity)
.select('#ddl_city', '19')
.wait(6000)
.select('#ddl_theater', '12')
.wait(1000)
.click('#btn_enter')
.wait('#aspnetForm')
.evaluate(function(){

    //here is where I want to return the html body
    return document.html;


})
.then(function(body){
//loading html body to cheerio
    var $ = cheerio.load(body);
    console.log(body);
})

