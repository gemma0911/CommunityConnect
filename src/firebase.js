
// Now you can use the 'storage' object to work with Firebase Storage
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDATux86z2o8c8TKIxUkrpw0-SgCaQCb9Q",
    authDomain: "appchat-2b91f.firebaseapp.com",
    databaseURL: "https://appchat-2b91f-default-rtdb.firebaseio.com",
    projectId: "appchat-2b91f",
    storageBucket: "appchat-2b91f.appspot.com",
    messagingSenderId: "112818285768",
    appId: "1:112818285768:web:fc527e325f092a93cf49fd",
    measurementId: "G-VL1ZXSZ9G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

// Now you can use the 'storage' object to work with Firebase Storage
export { storage, ref, uploadBytes, getDownloadURL };