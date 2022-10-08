import "./App.css";
import { useEffect, useState } from "react";
<<<<<<< HEAD

import app from "./database/firebase";

import { ref, set, getDatabase } from "firebase/database";

import ResultsPage from "./page/ResultsPage";

import { save_professor, save_student } from "./database/actions";

const DEPARTMENTS = ["PHYS", "ART", "CIS", "MATH"];

const defaultForm = {
  name: "",
  className: "",
  professor: "",
  maxGroupSize: 0,
  department: "",
};

const defaultFilters = {
  all: true,
  group: true,
  class: true,
  group: true,
};

=======
import database from "./firebase";
import { ref, set } from "firebase/database";
import Header from "./Components/Header";
>>>>>>> dc0327a96814c4d67479798d7325a25cbc5d3971
function App() {
  const [form, setForm] = useState(defaultForm);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    set(ref(getDatabase(app), "test"), {
      msg: "I Love World",
    });
  }, []);

  const onSubmit = () => {
    // save_professor("Test Ulb", "Math");
    save_student("djkaf92992988998", "m8", "test", "sdkl", 4, "PHYS");
    // const user = {
    //   98979798389289: {
    //     id: "98979798389289",
    //     name: "Michael Batrakov",
    //     className: "Physics 4A",
    //     professor: "Megan Ulbricht",
    //     maxGroupSize: 3,
    //     department: "Physics",
    //   },
    // };
    // set(ref(getDatabase(app), DEPARTMENTS[0] + "/users"), user);
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
