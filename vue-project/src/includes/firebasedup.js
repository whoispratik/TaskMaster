// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
//import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD1wPp3iSSOXiL6cyfjgDEi3tDB7cZtTcQ',
  authDomain: 'taskmaster-66d3f.firebaseapp.com',
  projectId: 'taskmaster-66d3f',
  storageBucket: 'taskmaster-66d3f.appspot.com',
  messagingSenderId: '386173811601',
  appId: '1:386173811601:web:3c47349028631618eeb830',
  measurementId: 'G-37MFP9WZYQ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const secoauth = getAuth(app)
//const secodb = getFirestore(app)
//const analytics = getAnalytics(app)
export { secoauth }
