// Firebase config (paste your config here)
const firebaseConfig = {
  apiKey: "AIzaSyDigcQvQOLbGWmJv_QpFPMPzB7-qzD1drw",
  authDomain: "myscoregrad.firebaseapp.com",
  projectId: "myscoregrad",
  storageBucket: "myscoregrad.firebasestorage.app",
  messagingSenderId: "554437460327",
  appId: "1:554437460327:web:321114cbd97018ef9c6fc2",
  measurementId: "G-LXD6GJ09PC"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Signup function
function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup successful!");
      // Do NOT redirect here
    })
    .catch(err => alert(err.message));
}

// Login function
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      // Just show a message
      alert("Login successful!");
      // Do NOT redirect here
    })
    .catch(err => alert(err.message));
}

// Listen for auth state changes
auth.onAuthStateChanged(user => {
  if (user) {
    // User is logged in, redirect to dashboard if on index.html
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
      window.location.href = "dashboard.html";
    }
  }
});
