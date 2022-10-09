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
import { DEPARTMENTS, CLASSES, PROFESSORS } from './database/schoolShit';

const defaultForm = {
  name: "",
  description: "",
  phoneNumber: "",
  discord: "",
  className: "",
  professor: "",
  maxGroupSize: 1,
  department: "",
};

const defaultSameFilters = {
  all: true,
  group: false,
  class: true,
  professor: true,
};

function App() {
  const [form, setForm] = useState(defaultForm);
  const [results, setResults] = useState([]);
  const [sameFilters, setSameFilters] = useState(defaultSameFilters);
  const [isPosting, setIsPosting] = useState(false);
  
  

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
      form.department,
      form.phoneNumber,
      form.discord
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
            <h5>Your Name</h5>
            <input
              value={form.name}
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
            />
            <h5>Max Group Size Preferred</h5>
            <input
              value={form.maxGroupSize}
              type="number"
              placeholder="Looking for group size (max)"
              onChange={(e) =>
                setForm({ ...form, maxGroupSize: e.target.value })
              }
              className="input"
            />

            <h5>Describe Yourself and Meeting Times</h5>
            <textarea
              value={form.description}
              placeholder="Describe Yourself"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <h5>Department (Required)</h5>
            <SearchableTextField
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              onClick={(txt) => setForm({ ...form, department: txt })}
              data={DEPARTMENTS}
              placeholder="Department"
            />
            <h5>Professor You Are Taking</h5>
            <SearchableTextField
              value={form.professor}
              onChange={(e) => setForm({ ...form, professor: e.target.value })}
              onClick={(txt) => setForm({ ...form, professor: txt })}
              data={PROFESSORS}
              placeholder="Professor Name"
            />
            <h5>Class Name</h5>
            <SearchableTextField
              value={form.className}
              onChange={(e) => setForm({ ...form, className: e.target.value })}
              onClick={(txt) => setForm({ ...form, className: txt })}
              data={CLASSES}
              placeholder="Class Name"
            />
            <h5>Ways to Contact You</h5>
            <input
              value={form.phoneNumber}
              type="number"
              placeholder="Phone Number"
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
              className="input"
            />
            <input
              value={form.discord}
              type="text"
              placeholder="Discord Link"
              onChange={(e) => setForm({ ...form, discord: e.target.value })}
              className="input"
            />
            <div className="button-container">
              <Button variant="success" onClick={onSubmit}>
                Submit My App
              </Button>
            </div>
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
            <div className="button-container">
              <button onClick={onSearch}>Search</button>
            </div>
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
        <Button
          variant={
            sameFilters["professor"] &&
            sameFilters["group"] &&
            sameFilters["class"]
              ? "primary"
              : "secondary"
          }
        >
          All
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
