// Import Firebase modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Firebase configuration (your project)
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

// Protect dashboard: only logged-in users can see content
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Not logged in → redirect to login page
    window.location.href = "index.html";
  } else {
    // Logged in → fetch courses
    try {
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const coursesContainer = document.getElementById("courses");

      if (coursesSnapshot.empty) {
        coursesContainer.innerHTML = "<p>No courses available yet.</p>";
      } else {
        coursesContainer.innerHTML = ""; // clear previous content
        coursesSnapshot.forEach(doc => {
          const data = doc.data();
          coursesContainer.innerHTML += `
            <div class="course">
              <h3>${data.title}</h3>
              <p>${data.description}</p>
              <a href="${data.videoUrl}" target="_blank">Watch</a>
            </div>
          `;
        });
      }

      console.log("Fetched courses:", coursesSnapshot.docs.length);
    } catch (err) {
      console.error("Error fetching courses:", err);
      document.getElementById("courses").innerHTML = "<p>Failed to load courses.</p>";
    }
  }
});

// Logout function
window.logout = function() {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "index.html";
    })
    .catch(err => {
      console.error("Logout error:", err);
      alert("Error logging out. Try again.");
    });
};
