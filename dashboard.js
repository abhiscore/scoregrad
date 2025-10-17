// Firebase config (same as script.js)
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
const db = firebase.firestore();

// Logout function
function logout() {
  auth.signOut().then(() => {
    alert("Logged out!");
    window.location.href = "index.html";
  });
}

// Fetch and display courses
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
