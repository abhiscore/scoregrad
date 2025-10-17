// Firebase config (paste your config here)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
