import "./App.css";
import { useEffect, useState } from "react";
import database from "./firebase";
import { ref, set } from "firebase/database";
import Header from "./Components/Header";
function App() {
  const endpoint = "https://dinder-2-default-rtdb.firebaseio.com/";
  const [form, setForm] = useState({
    name: "",
  });

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

  const onSubmit = () => {
    const user = {
      98979798389289: {
        name: "Michael Batrakov",
        className: "Physics 4A",
        professor: "Megan Ulbricht",
        preferredGroupSize: "1-4",
        department: "Physics",
      },
    };
    set(ref(database, "users"), user);
  };

  return (
    <div className="App">
      <Header/>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.value })}
      />
      <button onClick={onSubmit}>Log</button>
    </div>
  );
}

/**
 *
 * Student ID
 * Name (last, first)
 * Department
 * Specific Class | Professor
 * Preferred Group Size (ranges)
 */
export default App;
