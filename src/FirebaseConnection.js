import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyCP1-khlcbfgzXIfEBkyKnbdifXEwoMpgA",
  authDomain: "rhs-folha-de-ponto.firebaseapp.com",
  projectId: "rhs-folha-de-ponto",
  storageBucket: "rhs-folha-de-ponto.appspot.com",
  messagingSenderId: "437824673908",
  appId: "1:437824673908:web:c22f576d4548b9c5665921",
  measurementId: "G-RMDX7Q7WLK"
};

 

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth=getAuth(firebaseApp);

export  {db,auth};