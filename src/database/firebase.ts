import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyC85MEK9p9ki8uerRal7aMkHrK3p1IfzmE",
  authDomain: "dinder-2.firebaseapp.com",
  projectId: "dinder-2",
  storageBucket: "dinder-2.appspot.com",
  messagingSenderId: "637508758390",
  appId: "1:637508758390:web:f0fdcc074e028a6ef06857",
  databaseUrl: "https://dinder-2-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

export default app;
