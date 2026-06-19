import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  getDocFromServer
} from "firebase/firestore";
import config from "../../firebase-applet-config.json";

// Initialize Firebase
const app = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
});

// Configure Auth and Firestore
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Standard login popup fallback handles constraints nicely
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Use custom firestore database ID from configuration
const db = getFirestore(app, config.firestoreDatabaseId);

/**
 * Validate connection to Firestore
 */
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "users", "connection_test_doc"));
    console.log("[Pr. Molière Firebase] Connection validation: SUCCESS.");
  } catch (error: any) {
    if (error instanceof Error && error.message.includes("offline")) {
      console.warn("[Pr. Molière Firebase] Connection validation: OFFLINE mode.");
    } else {
      console.log("[Pr. Molière Firebase] Connection checked safely.");
    }
  }
}
testConnection();

export {
  auth,
  googleProvider,
  db,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  updateDoc
};
export type { FirebaseUser };
