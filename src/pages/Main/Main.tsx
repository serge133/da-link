import "./Main.css";
import { useCallback, useState } from "react";
import ResultsPage from "../../page/ResultsPage";
import { save_student, get_students } from "../../database/actions";
import { onValue } from "firebase/database";
import { uuidv4 } from "@firebase/util";
import SearchableTextField from "../../Components/SearchableTextField/SearchableTextField";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { relevancy } from "../../functions/sorter";
// import { DEPARTMENTS, CLASSES, PROFESSORS } from "../../database/schoolData";
import { Image } from "react-bootstrap";
import DALogo from "../../assets/DAC_Logo_Black.png";
import LINKlogo from "../../assets/link-logo.png";
import { Student } from "../../database/models";
import useAuth, { AuthWrapper } from "../../useAuth";
import { useNavigate } from "react-router";
import ClassSearch from "../../Containers/ClassSearch/ClassSearch";
import ClassesDisplay from "../../Containers/ClassesDisplay/ClassesDisplay";

const defaultForm = {
  id: "",
  userName: "",
  description: "",
  phoneNumber: 0,
  discord: "",
  className: "",
  professor: "",
  maxGroupSize: 1,
  department: "",
  search: "",
};

const Main = () => {
  const [form, setForm] = useState(defaultForm);
  const [results, setResults] = useState<Student[]>([]);
  const { logout } = useAuth();

  // const getStudentData = (department: string) => {
  //   const users = get_students(department);
  //   onValue(users, (snapshot) => {
  //     const data = snapshot.val() as Student[] | undefined;
  //     if (data) {
  //       const res = Object.values(data);
  //       setResults(res);
  //       console.log(data);
  //     }
  //   });
  // };

  // const onSubmit = () => {
  //   // save_professor(form.professor, form.department);
  //   save_student(
  //     uuidv4(),
  //     form.userName,
  //     form.description,
  //     form.className,
  //     form.professor,
  //     form.maxGroupSize,
  //     form.department,
  //     form.phoneNumber,
  //     form.discord
  //   );
  //   // getStudentData(form.department);
  //   // const db = getDatabase(app);
  //   // set(ref(db, `${form.department}/students/${form.id}`), {
  //   //   id,
  //   //   userName,
  //   //   className,
  //   //   professor,
  //   //   maxGroupSize,
  //   //   department,
  //   // });
  //   setForm(defaultForm);
  // };

  // const onSearch = () => {
  //   getStudentData(form.department);
  // };

  return (
    <AuthWrapper>
      <div className="App">
        <div className="logo__wrapper">
          <Image src={DALogo} style={{ height: 65 }} />
          <Image src={LINKlogo} style={{ height: 65 }} />
        </div>
        <div className="form__container">
          <ClassSearch
            department={form.department}
            search={form.search}
            onChangeSearch={(search: string) =>
              setForm((prevState) => ({ ...prevState, search: search }))
            }
            onChangeDepartment={(dept: string) =>
              setForm((prevState) => ({
                ...prevState,
                department: dept,
              }))
            }
          />
          <div className="button-container">
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
        <ClassesDisplay search={form.search} department={form.department} />
        {/* {!isPosting && (
          <ResultsPage
            results={relevancy(
              results,
              // sameFilters,
              form.userName,
              form.professor,
              form.className,
              form.maxGroupSize
            )}
          />
        )} */}
      </div>
    </AuthWrapper>
  );
};

export default Main;
