import Firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyC__QkkhAKb3B3rvTU0dAA4sT4IpU98dl8',
  authDomain: 'poker-webapi.firebaseapp.com',
  databaseURL: 'https://poker-webapi.firebaseio.com',
  projectId: 'poker-webapi',
  storageBucket: 'poker-webapi.appspot.com',
  messagingSenderId: '478384870633'
}

Firebase.initializeApp(config)

export const db = Firebase.database()
export const auth = Firebase.auth()
export const googleProvider = new Firebase.auth.GoogleAuthProvider()
export const twitterProvider = new Firebase.auth.TwitterAuthProvider()
export const githubProvider = new Firebase.auth.GithubAuthProvider()
