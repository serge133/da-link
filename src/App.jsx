import "./App.css";
import { useEffect } from "react";
import database from "./firebase";
import { ref, set } from "firebase/database";

function App() {
  const endpoint = "https://dinder-2-default-rtdb.firebaseio.com/";

  useEffect(() => {
    // const firebaseConfig = {
    //   apiKey: "AIzaSyC85MEK9p9ki8uerRal7aMkHrK3p1IfzmE",
    //   authDomain: "dinder-2.firebaseapp.com",
    //   projectId: "dinder-2",
    //   storageBucket: "dinder-2.appspot.com",
    //   messagingSenderId: "637508758390",
    //   appId: "1:637508758390:web:f0fdcc074e028a6ef06857",
    //   databaseUrl: "https://dinder-2-default-rtdb.firebaseio.com/",
    // };

    // const app = initializeApp(firebaseConfig);
    // const database = getDatabase(app);

    set(ref(database, "test"), {
      msg: "I Love World",
    });
  }, []);

  return <div className="App"></div>;
}

export default App;
