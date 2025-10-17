// Initialize Firebase with same config
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function logout() {
  auth.signOut().then(() => {
    alert("Logged out!");
    window.location.href = "index.html";
  });
}
