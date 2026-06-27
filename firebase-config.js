// ==================== FIREBASE CONFIG ====================
const firebaseConfig = {
  apiKey: "AIzaSyA_pDpQKsqDmyl47FthsPlBTtNXU6MwmBI",
  authDomain: "game-boys-studios.firebaseapp.com",
  projectId: "game-boys-studios",
  storageBucket: "game-boys-studios.firebasestorage.app",
  messagingSenderId: "296679716982",
  appId: "1:296679716982:web:542775f96fca966e154757"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencias
const auth = firebase.auth();

// Proveedor Google
const googleProvider = new firebase.auth.GoogleAuthProvider();

console.log("✅ Firebase inicializado correctamente");