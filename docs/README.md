# ScholarBoard API

How we got our data:

  1 - Scrape for data using nightmare.js and cheerio.js

  2 - Save raw text as JSON.

  3 - Unpack raw text in a python script for Regex.

  4 - Pack parsed text as JSON.

  5 - Create post route to save scholarship requirements as defined by model (Flask - find a way that will do this automatically everytime a new JSON is created with parsed data)

  6 - Create API so react app can make calls. 