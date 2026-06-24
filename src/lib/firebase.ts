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
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

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
const firestoreDatabaseId = (config as typeof config & { firestoreDatabaseId?: string }).firestoreDatabaseId;
const db = firestoreDatabaseId ? getFirestore(app, firestoreDatabaseId) : getFirestore(app);

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
