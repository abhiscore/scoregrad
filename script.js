// Paste your Firebase config here (from Step 2)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Signup function
function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(user => alert("Signed up successfully!"))
    .catch(err => alert(err.message));
}

// Login function
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(user => alert("Logged in successfully!"))
    .catch(err => alert(err.message));
}

// Fetch courses dynamically
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
