import "./Main.css";
import { ChangeEvent, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import DALogo from "../../assets/DAC_Logo_Black.png";
import LINKlogo from "../../assets/link-logo.png";
import useAuth, { AuthWrapper } from "../../useAuth";
import ClassSearch from "../../Containers/ClassSearch/ClassSearch";
import ClassesDisplay from "../../Containers/ClassesDisplay/ClassesDisplay";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import { get_student } from "../../database/actions";
import { getDatabase, onValue, ref, set } from "firebase/database";
import app from "../../database/firebase";

const Main = () => {
  const { department, search } = useParams();
  const { user } = useAuth();
  const [form, setForm] = useState({
    department: department ? department : "",
    search: search ? search : "",
  });

  const [me, setMe] = useState({
    myClasses: {} as { [crn: string]: boolean },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.toUpperCase(),
    }));
  };

  const onClickList = (listValue: string) => {
    setForm((prevState) => ({
      ...prevState,
      department: listValue,
    }));
  };

  useEffect(() => {
    if (user) {
      const studentRef = get_student(user?.uid);
      onValue(studentRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMe((prevState) => ({ ...prevState, ...data }));
        }
      });
    }
  }, [user]);

  const toggleMyClass = (crn: string) => {
    const db = getDatabase(app);
    const copyMyClasses = { ...me.myClasses };
    if (crn in copyMyClasses) {
      delete copyMyClasses[crn];
      setMe((prevState) => ({
        ...prevState,
        myClasses: copyMyClasses,
      }));
    } else {
      copyMyClasses[crn] = true;
      setMe((prevState) => ({
        ...prevState,
        myClasses: copyMyClasses,
      }));
    }
    set(ref(db, `users/${user?.uid}/myClasses`), copyMyClasses);
  };

  return (
    <AuthWrapper>
      <div className="App">
        <NavigationBar />
        <div className="form__container class-search">
          <ClassSearch
            department={form.department}
            search={form.search}
            handleChange={handleChange}
            onClickList={onClickList}
          />
          <div className="button-container">
            {/* <Button variant="secondary" onClick={logout}>
            </Button> */}
          </div>
        </div>
        <ClassesDisplay
          me={me}
          toggleMyClass={toggleMyClass}
          search={form.search}
          department={form.department}
        />
      </div>
    </AuthWrapper>
  );
};

export default Main;
