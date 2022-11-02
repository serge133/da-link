import { onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import ClassCard from "../../Components/ClassCard";
import NavigationBar from "../../Components/Navbar";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import database from "../../database/firebase";
import { Class, MyClasses } from "../../database/models";
import "./MyClassesPage.css";
// import classes from "../../database/raw/classes.json";
import { useNavigate } from "react-router";

type Props = {};

const MyClassesPage = (props: Props) => {
  const [myClasses, setMyClasses] = useState<MyClasses>({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const myClassesRef = ref(database, `/users/${user.uid}/myClasses`);

    onValue(myClassesRef, (snapshot) => {
      const data: { [crn: string]: Class } = snapshot.val();

      if (data) {
        setMyClasses(data);
      }
    });
  }, [user]);

  const openClass = (c: Class) => {
    const url = `/class/${c.crn}/${c.department}`;
    navigate(url);
  };

  const removeMyClass = (c: Class) => {
    const myClassesRef = ref(database, `/users/${user.uid}/myClasses/${c.crn}`);

    const copyMyClasses = { ...myClasses };
    delete copyMyClasses[c.crn];
    setMyClasses((prevState) => copyMyClasses);
    remove(myClassesRef);
  };

  return (
    <AuthWrapper>
      <div className="App my-classes-page">
        <NavigationBar />
        {myClasses &&
          Object.values(myClasses).map((c) => (
            <ClassCard
              crn={c.crn}
              key={c.crn}
              classCode={c.id}
              className={c.className}
              classStatus={c.classStatus}
              isMyClass={true}
              professor={c.professor}
              handleClickJoin={() => removeMyClass(c)}
              handleDetailsClick={() => openClass(c)}
            />
          ))}
      </div>
    </AuthWrapper>
  );
};

export default MyClassesPage;
