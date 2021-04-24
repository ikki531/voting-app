import firebase from "firebase/app";
import "firebase/firestore";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLGOP2tyd17NuIIt4lFzuT_IPq1ommzLU",
  authDomain: "voting-app-163ec.firebaseapp.com",
  projectId: "voting-app-163ec",
  storageBucket: "voting-app-163ec.appspot.com",
  messagingSenderId: "977618051177",
  appId: "1:977618051177:web:0b113f878f3cdc9115c2f8",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
