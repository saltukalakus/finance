Stack

Webpack
Webpack dev server

Postcss

React
React router

Redux

Auth0

Firebase


------

          target: 'Yq8ALLieVYPZgtSvgCSypJ2pAXcHqGJ4'
    };
    auth0.getDelegationToken(options, function(err, result) {
          if(!err) {
              // Exchange the delegate token for a Firebase auth token
              firebase.auth().signInWithCustomToken(result.id_token).catch(function(error) {
                console.log(error);
              });
          }
    });*/
  }

  _authorizationError(error){
    // Unexpected authentication error
    console.log('Authentication Error', error)
  }

  login() {
    // Call the show method to display the widget.
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
    /*firebase.auth().signOut().then(function() {
      console.log("Signout Successful")
      }, function(error) {
        console.log(error);
      });*/
}
