import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDj6ssH7GM7X_6SqE_vA_bseRV6lhQhlpY',
  authDomain: 'tasche-web.firebaseapp.com',
  databaseURL: 'https://tasche-web.firebaseio.com',
  projectId: 'tasche-web',
  storageBucket: '',
  messagingSenderId: '542476823252'
}

Firebase.initializeApp(config)

export const db = Firebase.database()
export const auth = Firebase.auth()
export const googleProvider = new Firebase.auth.GoogleAuthProvider()
export const twitterProvider = new Firebase.auth.TwitterAuthProvider()
export const githubProvider = new Firebase.auth.GithubAuthProvider()
