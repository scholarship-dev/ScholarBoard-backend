# Scholarboard API

### Overview
Scholarboard is an authenticated REST API that serves the the Web and iOS client.

### Examples


### Endpoints

Scholarboard follows a RESTFull Architecture. Below are the available endpoints.

|       Verb          |      Endpoint        |      Description                           |
| -------------       |:--------------------:| ------------------------------------------:|
| GET                 | /api/scholarships                       |Get all scholarships from the DB         |
| GET                 | /api/scholarships/:id         |Get data for a specific scholarship    |
| GET                 | /api/dashboard       |Get scholarships that matches the user criteria and the current user data       |
| GET                 | /api/profile/:email|Get the user profile   |
| POST                | /api/sign-up|Sign up a user |
| POST                | /api/sign-in|Sign in a user |
| DELETE              | /api/sign-out|Sign out a user|
