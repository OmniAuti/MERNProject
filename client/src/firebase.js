// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };


const firebaseConfig = {
  apiKey: "AIzaSyC-eGyEbECcramuzB0BimAuGkeZ3NMcpG4",
  authDomain: "borrow-90a3d.firebaseapp.com",
  projectId: "borrow-90a3d",
  storageBucket: "borrow-90a3d.appspot.com",
  messagingSenderId: "958075155278",
  appId: "1:958075155278:web:0d4b3f0d1dc1d394d4241f",
  measurementId: "G-VF48B1F9GT"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp)
//NEW --------------

