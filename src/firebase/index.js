import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDj6ssH7GM7X_6SqE_vA_bseRV6lhQhlpY',
  authDomain: 'tasche-web.firebaseapp.com',
  databaseURL: 'https://tasche-web.firebaseio.com',
  projectId: 'tasche-web',
  storageBucket: 'tasche-web.appspot.com',
  messagingSenderId: '542476823252',
  appId: '1:542476823252:web:d663d4afb67d53bd3fe941'
}

Firebase.initializeApp(config)

export const db = Firebase.database()
export const auth = Firebase.auth()
export const storage = Firebase.storage()
export const googleProvider = new Firebase.auth.GoogleAuthProvider()
export const twitterProvider = new Firebase.auth.TwitterAuthProvider()
export const githubProvider = new Firebase.auth.GithubAuthProvider()
