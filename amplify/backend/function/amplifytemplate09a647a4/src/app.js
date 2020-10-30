/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios')

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
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// redirect to authorization page
app.get('/authorization', function(req, res) {
  const client = new AuthorizationCode(config);

  const redirectUri = client.authorizeURL({
    redirect_uri: process.env.REDIRECT_URI
  });
  
  console.log('uri: ', redirectUri)
  
  res.redirect(redirectUri);
});

// callback and get access token
app.get('/callback', function(req, res) {
  const code = req.query.code
  callback(code, res);
});

function getFreeeUser(accessToken) {
  return axios.get('https://api.freee.co.jp/api/1/users/me?companies=true', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
}

/**
 * Get token, save it to firebase and login firebase
 */

async function callback(code, res) {
  const client = new AuthorizationCode(config);

  try {
    const result = await client.getToken({
      client_id: config.client.id,
      client_secret: config.client.secret,
      code: code,
      redirect_uri: process.env.REDIRECT_URI
    })
    
    const freeeToken = {
      accessToken: result.token.access_token,
      refreshToken: result.token.refresh_token,
      expiresIn: result.token.expires_in,
      createdAt: result.token.created_at
    }

    // get freee user
    const response = await getFreeeUser(freeeToken.accessToken)

    // res.send(user)
    
    const id = response.data.user.id
    const email = response.data.user.email
    
    // consider null value of displayName
    const displayName = response.data.user.display_name
      ? response.data.user.display_name
      : ''

    // // Create a Firebase Account and get the custom Auth Token.
    // const firebaseToken = await this.createFirebaseAccount(
    //   id,
    //   email,
    //   displayName,
    //   freeeToken
    // )

    // redirect to home path with token info
    res.redirect(`http://localhost:3000?id=${id}&email=${email}&displayName=${displayName}`)
  } catch (error) {
    console.error('Some error occured on login process:', error)
    res.send(401)
    // res.send(this.signInRefusedTemplate())
  }
}

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
