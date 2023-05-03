import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAUSYPjoFnXUMYgBoiHcnspmu826yXDf4A",
	authDomain: "neotrade-7662b.firebaseapp.com",
	projectId: "neotrade-7662b",
	storageBucket: "neotrade-7662b.appspot.com",
	messagingSenderId: "865326132022",
	appId: "1:865326132022:web:ebc28ea7f26d259cd06197",
	measurementId: "G-2FFKRCCMBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();
const storage = getStorage(app);
export { auth, google, facebook, storage };
