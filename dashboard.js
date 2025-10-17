import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDigcQvQOLbGWmJv_QpFPMPzB7-qzD1drw",
  authDomain: "myscoregrad.firebaseapp.com",
  projectId: "myscoregrad",
  storageBucket: "myscoregrad.appspot.com", // corrected
  messagingSenderId: "554437460327",
  appId: "1:554437460327:web:321114cbd97018ef9c6fc2",
  measurementId: "G-LXD6GJ09PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Protect dashboard: only logged-in users
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    // Fetch courses dynamically
    const coursesSnapshot = await getDocs(collection(db, "courses"));
    coursesSnapshot.forEach(doc => {
      const data = doc.data();
      document.getElementById("courses").innerHTML += `
        <div class="course">
          <h3>${data.title}</h3>
          <p>${data.description}</p>
          <a href="${data.videoUrl}" target="_blank">Watch</a>
        </div>
      `;
    });
  }
});

// Logout function
window.logout = function() {
  signOut(auth).then(() => {
    alert("Logged out!");
    window.location.href = "index.html";
  });
};
