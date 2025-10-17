// Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDigcQvQOLbGWmJv_QpFPMPzB7-qzD1drw",
  authDomain: "myscoregrad.firebaseapp.com",
  projectId: "myscoregrad",
  storageBucket: "myscoregrad.firebasestorage.app",
  messagingSenderId: "554437460327",
  appId: "1:554437460327:web:321114cbd97018ef9c6fc2",
  measurementId: "G-LXD6GJ09PC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// --- Auth state listener ---
// Protect dashboard: only allow logged-in users
auth.onAuthStateChanged(user => {
  if (!user) {
    // User not logged in → redirect to homepage
    window.location.href = "index.html";
  } else {
    // User logged in → fetch and display courses
    db.collection("courses").get().then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        document.getElementById("courses").innerHTML += `
          <div class="course">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <a href="${data.videoUrl}" target="_blank">Watch</a>
          </div>
        `;
      });
    });
  }
});

// --- Logout function ---
function logout() {
  auth.signOut().then(() => {
    alert("Logged out!");
    window.location.href = "index.html";
  });
}
