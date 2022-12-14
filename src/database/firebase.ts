import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  databaseUrl: import.meta.env.VITE_DB_URL,
};

export const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// export const messaging = getMessaging(app);

export default database;
