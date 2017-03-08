import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import Auth0 from 'auth0-js'
import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import * as firebase from 'firebase'
import request from 'superagent';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    this.domain = domain

    //this.webAuth = new Auth0.WebAuth({ domain: domain, clientID: clientId})
    this.auth0 = new Auth0({ domain: domain, clientID: clientId})


    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:8080/login',
        responseType: 'token'
      },
      language: 'es',
      additionalSignUpFields: [{
        name: "address",                              // required
        placeholder: "enter your address",            // required
        validator: function(value) {                  // optional
          // only accept addresses with more than 10 chars
          return value.length > 10;
        }
      }],
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication2.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication2(authResult){
     this.setToken(authResult.idToken) 
     // Set the options to retreive a firebase delegation token
        var options = {
          id_token : authResult.idToken,
          api : 'firebase',
          scope : 'openid name email displayName',
          target: 'Yq8ALLieVYPZgtSvgCSypJ2pAXcHqGJ4'
        };

        console.log("Get the Firebase token with delegation endpoint -2 ");
        // Make a call to the Auth0 '/delegate'
        this.auth0.getDelegationToken(options, function(err, result) {
          if(!err) {
            // Exchange the delegate token for a Firebase auth token
            firebase.auth().signInWithCustomToken(result.id_token).catch(function(error) {
              console.log(error);
            });
          } else {
                firebase.auth().onAuthStateChanged(firebaseUser => {
                  if (firebaseUser) console.log(firebaseUser)
                  else console.log('no user')
                })
          }
        });
  }

  _doAuthentication(authResult){
    // Saves the user token
    this.setToken(authResult.idToken)

    /* var options = {
          client_id : 'Yq8ALLieVYPZgtSvgCSypJ2pAXcHqGJ4',
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          id_token : authResult.idToken,
          target: 'Yq8ALLieVYPZgtSvgCSypJ2pAXcHqGJ4',
          scope : 'openid',
          api_type : 'firebase'
        }; */
    var options = {
          client_id : 'Yq8ALLieVYPZgtSvgCSypJ2pAXcHqGJ4',
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          id_token : authResult.idToken,
          target: 'Yq8ALLieVYPZgtSvgCSypJ2pAXcHqGJ4',
          scope : 'openid name email displayName',
          api_type : 'firebase'
        };
    // Call Auth0 endpoint for delegation
    console.log("Get the Firebase token with delegation endpoint");
    //this.webAuth.delegation(options, function(err, result) {
    request
      .post('https://' + this.domain + '/delegation')
      .send(options)
      .set('Accept', 'application/json')
      .end(function(err, result){
          console.log("Token endpoint from Auth0 replied.");
          console.log(result);

          if(!err) {
            firebase.auth().signInWithCustomToken(result.id_token).catch(function(error) {
              console.log(error);
            });
          } else {
                firebase.auth().onAuthStateChanged(firebaseUser => {
                  if (firebaseUser) console.log(firebaseUser)
                  else console.log('no user')
                })

          }
      });


    //browserHistory.replace('/home')


  }

  _authorizationError(error){
    // Unexpected authentication error
    console.log('Authentication Error', error)
  }

  login() {
    // Call the show method to display the widget.
    console.log("Login screen entered")
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile(){
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  updateProfile(userId, data){
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    }
    return fetch(`https://${this.domain}/api/v2/users/${userId}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(newProfile => this.setProfile(newProfile))
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
     firebase.auth().signOut().then(function() {
    console.log("Signout Successful")
  }, function(error) {
    console.log(error);
  });
  }
}
