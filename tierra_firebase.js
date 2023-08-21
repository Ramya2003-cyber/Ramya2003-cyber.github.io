// // Import the functions you need from the SDKs you need
// import{
//     getFirestore,collection,getDocs,
//     addDoc,deleteDoc,doc,onSnapshot,
//     query,where,
//     orderBy,serverTimestamp,
//     getDoc,
//     updateDoc

// } from 'firebase/firestore'
// import{
//     getAuth,createUserWithEmailAndPassword,signOut,
//     signInWithEmailAndPassword,
//     onAuthStateChanged
// }from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCibRV67v0NG8Cwuulqcl01gOA0_tkvGxo",
  authDomain: "tierraservices-b0dff.firebaseapp.com",
  projectId: "tierraservices-b0dff",
  storageBucket: "tierraservices-b0dff.appspot.com",
  messagingSenderId: "604181346398",
  appId: "1:604181346398:web:fd9fb448f9926ceb151ccf",
  measurementId: "G-BE8K76FBNL"
};

// Initialize Firebase

// app.js


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const db = firebase.firestore();
const auth = firebase.auth();
const colRef = db.collection('services');
// app.js


const serviceCountElement = document.getElementById('serviceCount');

document.getElementById('okBtn').addEventListener('click', e=>{
  e.preventDefault();
console.log("hi firebase");
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    issue: document.getElementById('issue').value,
    serviced: false,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    // Add the form data to Firestore collection
   colRef.add(formData);
   console.log('firebase successfull');

  } catch (error) {
    console.log('Error adding document: ', error);
  }
  
})




colRef.onSnapshot((snapshot) => {
 const filteredDocs = snapshot.docs.filter((doc) => doc.data().serviced === true);

  const count = filteredDocs.length;

  serviceCountElement.textContent = count;
});
