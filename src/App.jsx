import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import ResultsPage from "./page/ResultsPage";
import { save_professor, save_student } from "./database/actions";
import app from "./database/firebase";
import { uuidv4 } from "@firebase/util";
import SearchableTextField from "./Components/SearchableTextField/SearchableTextField";

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
  const DEPARTMENTS = ["PHYS", "ART", "CIS", "MATH"];
  const PROFESSORS = ["Megan Ulbricht", "Taylor Lawrence", "Another Name"];
  const CLASSES = ["PHYS 4A", "MATH 02A", "CIS22C", "MATH 01D"];

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
      {/* <input
        value={form.className}
        placeholder="Class Name"
        onChange={(e) => setForm({ ...form, className: e.target.value })}
      /> */}
      {/* <input
        value={form.professor}
        placeholder="Professor"
        onChange={(e) => setForm({ ...form, professor: e.target.value })}
      /> */}
      <input
        value={form.maxGroupSize}
        placeholder="Max Group Size"
        type="number"
        onChange={(e) => setForm({ ...form, maxGroupSize: e.target.value })}
      />
      <SearchableTextField
        value={form.professor}
        onChange={(e) => setForm({ ...form, professor: e.target.value })}
        onClick={(txt) => setForm({ ...form, professor: txt })}
        data={PROFESSORS}
        placeholder="Professor Name"
      />
      <SearchableTextField
        value={form.className}
        onChange={(e) => setForm({ ...form, className: e.target.value })}
        onClick={(txt) => setForm({ ...form, className: txt })}
        data={CLASSES}
        placeholder="Class Name"
      />
      {/* <input
        value={form.department}
        placeholder="Department"
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      /> */}
      <SearchableTextField
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
        onClick={(txt) => setForm({ ...form, department: txt })}
        data={DEPARTMENTS}
        placeholder="Department"
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
