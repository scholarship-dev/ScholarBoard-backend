# Scholarboard Backend Server/API

This repository contains the source code of the scholarboard backend that supports the web and ios client.

## Engineers
* **<a href= "https://github.com/ThomasLee94">Thomas Lee</a>** - *Back End Lead Engineer*
* **<a href= "https://github.com/MediBoss">Medi Assumani</a>** - *Back End Engineer*


## Technology

* Node.JS
* Express.JS
* MongoDB


### Endpoints

Scholarboard follows a RESTFull Architecture. Below are the available endpoints.

#### Base URL : https://scholarboard-api.herokuapp.com/

|       Verb          |      Endpoint        |      Description                           |
| -------------       |:--------------------:| ------------------------------------------:|
| GET                 | /api/scholarships                       |Get all scholarships from the DB         |
| GET                 | /api/scholarships/:id         |Get data for a specific scholarship    |
| GET                 | /api/dashboard       |Get scholarships that matches the user criteria and the current user data       |
| GET                 | /api/profile/:email|Get the user profile   |
| POST                | /api/sign-up|Sign up a user |
| POST                | /api/sign-in|Sign in a user |
| DELETE              | /api/sign-out|Sign out a user|


## Acknowledgement

* Hat tip to anyone who's code was used
* Replace this with something else - anyone who helped you(Link it to their github page)


## License
This project is licensed under the Apache License 2.0 - see the <a href="https://github.com/scholarship-dev/ScholarBoard-backend/blob/master/LICENSE">LICENSE</a> file for details
