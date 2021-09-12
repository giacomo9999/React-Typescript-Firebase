My first attempt to build a React app using TypeScript, 03 Sep 2021  

Important note: to run, this project requires a file named firebase.ts in the src directory. It has been omitted in this repo for security reasons:    

src/firebase.ts:  

import firebase from "firebase/app";  
import "firebase/database";  
// Your web app's Firebase configuration  
const firebaseConfig = {  
  apiKey: --API Key here--,  
  authDomain: --Auth domain here--,  
  projectId: --Project ID here--,  
  storageBucket: --Bucket ID here--,  
  messagingSenderId: --Messaging Sender ID here--,  
  appId: --appId here--,  
};  

// Initialize Firebase  
firebase.initializeApp(firebaseConfig);  
export default firebase.database();

--Important Discovery, 11 Sep: Firebase and Firestore are NOT the same thing.

12 Sep: I am having serious issues understanding the asynchronous functions that talk to the database.
