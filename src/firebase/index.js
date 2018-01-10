import Firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyC__QkkhAKb3B3rvTU0dAA4sT4IpU98dl8',
  authDomain: 'poker-webapi.firebaseapp.com',
  databaseURL: 'https://poker-webapi.firebaseio.com',
  projectId: 'poker-webapi',
  storageBucket: '',
  messagingSenderId: '478384870633'
}

Firebase.initializeApp(config)

export const db = Firebase.database()
