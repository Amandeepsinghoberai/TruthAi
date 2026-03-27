import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnBq_0uTbo-iiIahuxIx1yIqV_47lEnow",
  authDomain: "truthai-1308.firebaseapp.com",
  projectId: "truthai-1308",
  storageBucket: "truthai-1308.firebasestorage.app",
  messagingSenderId: "438581359510",
  appId: "1:438581359510:web:fbd213f23bb7d0861263b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
