import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCGzcxlmnOMkzSHydUfRn9A0Hdo87wSKsM",
    authDomain: "webappp-auth.firebaseapp.com",
    projectId: "webappp-auth",
    storageBucket: "webappp-auth.firebasestorage.app",
    messagingSenderId: "431690811852",
    appId: "1:431690811852:web:f94c1303a07db8d6d57569",
    measurementId: "G-RZL2XRYM52"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


