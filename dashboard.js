import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDigcQvQOLbGWmJv_QpFPMPzB7-qzD1drw",
  authDomain: "myscoregrad.firebaseapp.com",
  projectId: "myscoregrad",
  storageBucket: "myscoregrad.appspot.com",
  messagingSenderId: "554437460327",
  appId: "1:554437460327:web:321114cbd97018ef9c6fc2",
  measurementId: "G-LXD6GJ09PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Protect dashboard
onAuthStateChanged(auth, async (user) => {
  if (!user) window.location.href = "index.html";
  else loadCourses();
});

// Logout
window.logout = function() {
  signOut(auth).then(() => window.location.href = "index.html");
};

// Load courses dynamically
async function loadCourses() {
  const coursesContainer = document.getElementById("courses");
  coursesContainer.innerHTML = "";
  try {
    const snapshot = await getDocs(collection(db, "courses"));
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "course";
      card.innerHTML = `
        <img src="https://img.youtube.com/vi/${data.videoUrl}/hqdefault.jpg" alt="${data.title}">
        <div class="course-content">
          <h3>${data.title}</h3>
          <p>${data.description}</p>
          <button onclick="openModal('${data.videoUrl}')">Play</button>
        </div>
      `;
      coursesContainer.appendChild(card);
    });
  } catch(err) {
    coursesContainer.innerHTML = "<p>Failed to load courses.</p>";
    console.error(err);
  }
}

// Video modal
const modal = document.getElementById("video-modal");
const modalVideo = document.getElementById("modal-video");
const closeBtn = document.querySelector(".close-btn");

window.openModal = function(videoId) {
  modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  modal.style.display = "flex";
};

closeBtn.onclick = function() {
  modalVideo.src = "";
  modal.style.display = "none";
};

window.onclick = function(e) {
  if(e.target == modal) {
    modalVideo.src = "";
    modal.style.display = "none";
  }
};
