// =================== FIREBASE AUTH CHECK ===================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDigcQvQOLbGWmJv_QpFPMPzB7-qzD1drw",
  authDomain: "myscoregrad.firebaseapp.com",
  projectId: "myscoregrad",
  storageBucket: "myscoregrad.firebasestorage.app",
  messagingSenderId: "554437460327",
  appId: "1:554437460327:web:321114cbd97018ef9c6fc2",
  measurementId: "G-LXD6GJ09PC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// =================== PROTECT DASHBOARD ===================
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("username").textContent = user.email.split("@")[0];
  } else {
    window.location.href = "login.html"; // redirect if not logged in
  }
});

// =================== LOGOUT ===================
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("Logged out successfully!");
    window.location.href = "login.html";
  }).catch((error) => {
    alert("Error logging out: " + error.message);
  });
});

// =================== THEME TOGGLE ===================
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const mode = document.body.classList.contains("light-mode") ? "Light" : "Dark";
  themeBtn.innerHTML = mode === "Light" ? "🌞" : "🌙";
  localStorage.setItem("theme", mode);
});

// Load saved theme on refresh
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "Light") {
    document.body.classList.add("light-mode");
    themeBtn.innerHTML = "🌞";
  } else {
    document.body.classList.remove("light-mode");
    themeBtn.innerHTML = "🌙";
  }
};

// =================== LIVE CLASS COUNTDOWN ===================
function updateCountdown() {
  const target = new Date();
  target.setHours(20, 0, 0, 0); // Next live at 8:00 PM
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("liveTimer").textContent = "Live Now 🔴";
    return;
  }

  const hrs = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  document.getElementById("liveTimer").textContent = `${hrs}h ${mins}m ${secs}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// =================== PROGRESS SIMULATION ===================
let progress = 0;
function animateProgress() {
  const bar = document.getElementById("progressBar");
  progress += 1;
  if (progress > 70) return; // show 70% complete
  bar.style.width = `${progress}%`;
}
setInterval(animateProgress, 80);
