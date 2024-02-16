import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore,} from "firebase/firestore";

// Inicializamos la aplicación Firebase con la configuración proporcionada
const firebaseConfig = {
  apiKey: "AIzaSyAL_jJbMzjAkUR6v_5gpTHZjNXi4vl2SUw",
  authDomain: "conecta2-6a828.firebaseapp.com",
  databaseURL: "https://conecta2-6a828-default-rtdb.firebaseio.com",
  projectId: "conecta2-6a828",
  storageBucket: "conecta2-6a828.appspot.com",
  messagingSenderId: "627367081268",
  appId: "1:627367081268:web:6c77f3e838852e12912161"
};

// Inicializamos la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtenemos el objeto de autenticación y el proveedor de Google
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();

// Obtenemos el objeto Firestore
export const firestore = getFirestore();

export { auth, googleAuthProvider};
export default app;
