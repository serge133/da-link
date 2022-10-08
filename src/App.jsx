import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import ResultsPage from "./page/ResultsPage";
import { save_professor, save_student } from "./database/actions";
import app from "./database/firebase";
const DEPARTMENTS = ["PHYS", "ART", "CIS", "MATH"];
import { uuidv4 } from "@firebase/util";

const defaultForm = {
  name: "",
  className: "",
  professor: "",
  maxGroupSize: 1,
  department: "",
};

const defaultSameFilters = {
  all: true,
  group: true,
  class: true,
  professor: true,
};

function App() {
  const [form, setForm] = useState(defaultForm);
  const [sameFilters, setSameFilters] = useState(defaultSameFilters);

  useEffect(() => {}, []);

  const onSubmit = () => {
    // save_professor(form.professor, form.department);
    save_student(
      uuidv4(),
      form.name,
      form.className,
      form.professor,
      form.maxGroupSize,
      form.department
    );
    // const db = getDatabase(app);
    // set(ref(db, `${form.department}/students/${form.id}`), {
    //   id,
    //   userName,
    //   className,
    //   professor,
    //   maxGroupSize,
    //   department,
    // });
    setForm(defaultForm);
  };

  return (
    <div className="App">
      <Header />
      <input
        value={form.name}
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        value={form.className}
        placeholder="Class Name"
        onChange={(e) => setForm({ ...form, className: e.target.value })}
      />
      <input
        value={form.professor}
        placeholder="Professor"
        onChange={(e) => setForm({ ...form, professor: e.target.value })}
      />
      <input
        value={form.maxGroupSize}
        placeholder="Max Group Size"
        type="number"
        onChange={(e) => setForm({ ...form, maxGroupSize: e.target.value })}
      />
      <input
        value={form.department}
        placeholder="Department"
        onChange={(e) => setForm({ ...form, department: e.target.value })}
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
