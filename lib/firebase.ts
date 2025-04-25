import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCUX8y9yDt2P8l_qMXstVycf1Jm1BFai9A",
  authDomain: "sejong-web.firebaseapp.com",
  // databaseURL: "https://sejong-web.firebaseio.com",
  projectId: "sejong-web",
  storageBucket: "sejong-web.appspot.com",
  messagingSenderId: "698109956681",
  appId: "1:698109956681:web:95819f34447573d3e46598",
  measurementId: "G-FQL4RK97ZK"
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
// connectFirestoreEmulator(db, 'localhost', 8080);

