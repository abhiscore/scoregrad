// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "myscoregrad.firebaseapp.com",
  projectId: "myscoregrad",
  storageBucket: "myscoregrad.appspot.com",
  messagingSenderId: "554437460327",
  appId: "1:554437460327:web:321114cbd97018ef9c6fc2"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login / Signup
const loginBtn = document.getElementById('loginBtn');
if(loginBtn){
  loginBtn.addEventListener('click', ()=>{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email,password)
      .then(user=>window.location.href="dashboard.html")
      .catch(err=>{
        // If user not exist, create account
        auth.createUserWithEmailAndPassword(email,password)
          .then(user=>window.location.href="dashboard.html")
          .catch(err2=>document.getElementById('status').innerText=err2.message)
      })
  })
}

// Protect Dashboard
if(window.location.href.includes("dashboard.html")){
  auth.onAuthStateChanged(user=>{
    if(!user) window.location.href="login.html";
  })
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', ()=>{
    auth.signOut().then(()=>window.location.href="index.html");
  })
}
