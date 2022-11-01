import "./Main.css";
import { ChangeEvent, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import ClassSearch from "../../Containers/ClassSearch/ClassSearch";
import ClassesDisplay from "../../Containers/ClassesDisplay/ClassesDisplay";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import { get_student } from "../../database/actions";
import { onValue, ref, remove, set } from "firebase/database";
import database from "../../database/firebase";
import { Class, MyClass, MyClasses } from "../../database/models";

const Main = () => {
  const { department, search } = useParams();
  const { user } = useAuth();
  const [form, setForm] = useState({
    department: department ? department : "",
    search: search ? search : "",
  });

  const [me, setMe] = useState({
    myClasses: {} as MyClasses,
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

  const toggleMyClass = (c: Class) => {
    if (!form.department) return;
    const myClassesRef = ref(
      database,
      `/users/${user?.uid}/myClasses/${c.crn}`
    );

    if (c.crn in me.myClasses) {
      const copyMyClasses = { ...me.myClasses };
      delete copyMyClasses[c.crn];
      setMe((prevState) => ({
        ...prevState,
        myClasses: copyMyClasses,
      }));
      remove(myClassesRef);
      return;
    }

    set(myClassesRef, { ...c, department: form.department });
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
