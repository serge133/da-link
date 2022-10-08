import "./App.css";
import "./index.css";
import { useEffect, useState } from "react";
import ResultsPage from "./page/ResultsPage";
import { save_student, get_students } from "./database/actions";
import { onValue } from "firebase/database";
import { uuidv4 } from "@firebase/util";
import SearchableTextField from "./Components/SearchableTextField/SearchableTextField";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { relevancy } from "./functions/sorter";

const defaultForm = {
  name: "",
  description: "",
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
  const [results, setResults] = useState([]);
  const [sameFilters, setSameFilters] = useState(defaultSameFilters);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {}, []);
  const DEPARTMENTS = ["PHYS", "ART", "CIS", "MATH"];
  const PROFESSORS = ["Megan Ulbricht", "Taylor Lawrence", "Another Name"];
  const CLASSES = ["PHYS 4A", "MATH 02A", "CIS22C", "MATH 01D"];

  const getStudentData = (department) => {
    const users = get_students(department);
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const res = Object.values(data);
        setResults(res);
        console.log(data);
      }
    });
  };

  const onSubmit = () => {
    // save_professor(form.professor, form.department);
    save_student(
      uuidv4(),
      form.name,
      form.description,
      form.className,
      form.professor,
      form.maxGroupSize,
      form.department
    );
    // getStudentData(form.department);
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

  const onSearch = () => {
    getStudentData(form.department);
  };

  const onToggleFilter = (filt) => {
    setSameFilters((prevState) => ({ ...prevState, [filt]: !prevState[filt] }));
  };

  return (
    <div className="App">
      <div className="form__container">
        <div className="toggle-posting">
          <Button
            onClick={() => setIsPosting(true)}
            variant={isPosting ? "primary" : "secondary"}
          >
            Submit Application
          </Button>
          <Button
            onClick={() => setIsPosting(false)}
            variant={!isPosting ? "primary" : "secondary"}
          >
            Search Groups
          </Button>
        </div>
        {isPosting ? (
          <>
            <input
              value={form.name}
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
            />
            <input
              value={form.maxGroupSize}
              type="number"
              placeholder="Looking for group size (max)"
              onChange={(e) =>
                setForm({ ...form, maxGroupSize: e.target.value })
              }
              className="input"
            />
            <textarea
              value={form.description}
              placeholder="Describe Yourself"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <SearchableTextField
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              onClick={(txt) => setForm({ ...form, department: txt })}
              data={DEPARTMENTS}
              placeholder="Department"
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
            <button onClick={onSubmit}>Post</button>
          </>
        ) : (
          <>
            <SearchableTextField
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              onClick={(txt) => setForm({ ...form, department: txt })}
              data={DEPARTMENTS}
              placeholder="Department"
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

            <button onClick={onSearch}>Search</button>
          </>
        )}
      </div>
      <ResultsPage />
      <div className="row-filters">
        <Button
          onClick={() => onToggleFilter("class")}
          variant={sameFilters["class"] ? "primary" : "secondary"}
        >
          Same Class
        </Button>
        <Button
          onClick={() => onToggleFilter("professor")}
          variant={sameFilters["professor"] ? "primary" : "secondary"}
        >
          Same Professor
        </Button>
        <Button
          onClick={() => onToggleFilter("group")}
          variant={sameFilters["group"] ? "primary" : "secondary"}
        >
          Same Group Size
        </Button>
      </div>
      <ResultsPage
        filters={sameFilters}
        results={relevancy(
          results,
          sameFilters,
          form.name,
          form.professor,
          form.className,
          form.maxGroupSize
        )}
      />
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
