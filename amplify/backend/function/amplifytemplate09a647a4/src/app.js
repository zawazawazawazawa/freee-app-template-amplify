/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var oauth2 = require('simple-oauth2')
var cors = require('cors')

const config = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    tokenHost: process.env.TOKEN_HOST,
    tokenPath: process.env.TOKEN_PATH,
    revokePath: process.env.REVOKE_PATH,
    authorizeHost: process.env.AUTHORIZE_HOST,
    authorizePath: process.env.AUTHORIZE_PATH
  }
};
 
const { AuthorizationCode } = require('simple-oauth2');

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.use(cors());


/**********************
 * Example get method *
 **********************/

app.get('/authorization', function(req, res) {
  const client = new AuthorizationCode(config);

  const redirectUri = client.authorizeURL({
    redirect_uri: process.env.REDIRECT_URI
  });
  
  console.log('uri: ', redirectUri)
  
  res.redirect(redirectUri);
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
