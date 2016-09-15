![Swagger-Manager](./psd/logo.png "Swagger-Manager")

# Swagger-Manager

Swagger-Manager is a web-tool built with SailsJS and AngularJS to document and test your REST-API. Create and manage your REST-APIs and store information persistently.

Run API-tests manually and automatically to verify your HTTP-Responses from your REST webservice. Used test-tools are test-runner Mocha, assertion-library Chai, and plug-in Chai-HTTP.

## Features

- Backend
    - Build with SailsJS
    - RESTful webservice
    - Supports different database adapters like MySQL or MongoDB

- Frontend
    - Build with AngularJS
    - Material Design

- Swagger Support
    - Link a SwaggerUI distribution for viewing your specifications
    - Export API specification in Swagger compatible format
    - Use your specification for generating code to various languages (Swagger CodeGen)

## Requirements

- NodeJS, npm
- Bower
- Ruby (Bundler)
- Apache Web-Server
- Database (MySQL, MongoDB)

## Install and Run

### SetUp Database

Database Model is build with MySQL-Workbench and is located at ./database_model/model_database.mwb. Please read the [SailsJS documentation](http://sailsjs.org/) for configuring different database adapters.

#### MySQL

Create a database with phpmyadmin and synchronise ./database-modeldatabase-model.mwb with your web-server-database.
View [SailsJS documentation](http://sailsjs.org/) for setting up adapters in ./backend/config/connections.js.

API-Testing refer to connections mysql_local and mysql_production according to the environments development and production.

Example: ./backend/config/connections.js

```javascript
mysql_local: {
    adapter   : 'sails-mysql',
    host      : 'localhost',
    port      : 3306,
    user      : 'your-database-user',
    password  : 'your-password',
    database  : 'your-database-name'
},
mysql_production: {
    adapter   : 'sails-mysql',
    host      : 'localhost',
    port      : 3306,
    user      : 'your-database-user',
    password  : 'your-password',
    database  : 'your-database-name'
}
```

### Backend - SailsJS

1. `cd backend` - change directory to ./backend
2. `npm install` - install node dependencies

* `sails lift` - start server
* hosts REST Web Service at port 1337. http://{yourHost}:1337/

### Frontend - AngularJS

1. `cd frontend` - change directory to ./frontend
2. `npm install` - install node dependencies
2. `bundle install` - install gems
3. `bower install` - install bower dependencies

* `grunt serve` - build app for develop
* `grunt build production` - build distribution for deployment
* hosts at port 9009. http://{yourHost}:9009/#/

## Testing Frontend

1. `cd frontend`
2. `grunt test`

## Help us to improve it

Create your own fork of [swagger-manager](https://github.com/DREEBIT/swagger-manager)

To share your changes, [submit a pull request](https://github.com/DREEBIT/swagger-manager/pull/new/master).

## MIT License

Copyright (c) 2016 DREEBIT GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Related Commercial Projects

* [Restlet](https://studio.restlet.com)
