import "./App.css";
import { useEffect, useState } from "react";
import database from "./firebase";
import { ref, set } from "firebase/database";
import Header from "./Components/Header";
function App() {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    set(ref(getDatabase(app), "test"), {
      msg: "I Love World",
    });
  }, []);

  const onSubmit = () => {
    const user = {
      98979798389289: {
        id: "98979798389289",
        name: "Michael Batrakov",
        className: "Physics 4A",
        professor: "Megan Ulbricht",
        maxGroupSize: 3,
        department: "Physics",
      },
    };
    set(ref(getDatabase(app), DEPARTMENTS[0] + "/users"), user);
  };

  return (
    <div className="App">
      <Header/>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.value })}
      />
      <button onClick={onSubmit}>Log</button>
      <ResultsPage />
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
