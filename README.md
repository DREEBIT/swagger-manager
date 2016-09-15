# API-Manager

API-Manager is a web-tool for documenting and testing your RESTful-API. Build on SailsJS as backend, AngularJS as frontend.

## Features

- Backend
-- Build with SailsJS
-- RESTful Web Service
-- Supports different database adapter as MySQL or MongoDB

- Frontend
-- Build with AngularJS
-- Material Design

- Swagger Support
-- link a SwaggerUI distribution for viewing your specifications

## Requirements

- NodeJS, npm
- Bower
- Compass
- Web-Server
- Database (MySQL, MongoDB)

## Install

### SetUp Database

Database modeled with MySQL-Workbench. Model located at directory ./database_model. SailsJS supports MySQL and MongoDB.

#### MySQL

Create a database with phpmyadmin and synchronise database-model with your web-server-database.
View [SailsJS documentation](http://sailsjs.org/) for setting up adapters in ./backend/config/connections.js.

### Starting SailsJS - Backend

1. `cd backend`
2. `npm install`
3. `sails lift`

- hosts REST Web Service at port 1337. http://{yourHost}:1337/

### Starting AngularJS - Frontend

1. `cd frontend`
2. `npm install`
3. `bower install`
4. `grunt serve`

- hosts at port 9009. http://{yourHost}:9009/#/

## Testing Frontend

1. `cd frontend`
2. `grunt test`

## MIT License

Copyright (c) 2016 DREEBIT GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.