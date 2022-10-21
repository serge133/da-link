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
import NavigationBar from "../../Components/Navbar/Navbar";
import { get_student } from "../../database/actions";
import { getDatabase, onValue, ref, set } from "firebase/database";
import app from "../../database/firebase";

interface Favorites {
  [crn: string]: boolean;
}

const Main = () => {
  const { department, search } = useParams();
  const { user } = useAuth();
  const [form, setForm] = useState({
    department: department ? department : "",
    search: search ? search : "",
  });

  const [me, setMe] = useState({
    favorites: {} as Favorites,
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
          setMe(data);
        }
      });
    }
  }, [user]);

  const toggleFavoriteClass = (crn: string) => {
    const db = getDatabase(app);
    const copyFavorites = { ...me.favorites };
    if (crn in copyFavorites) {
      delete copyFavorites[crn];
      setMe((prevState) => ({
        ...prevState,
        favorites: copyFavorites,
      }));
    } else {
      copyFavorites[crn] = true;
      setMe((prevState) => ({
        ...prevState,
        favorites: copyFavorites,
      }));
    }
    set(ref(db, `users/${user?.uid}/favorites`), copyFavorites);
  };

  return (
    <AuthWrapper>
      <div className="App">
        <NavigationBar />
        <div className="logo__wrapper">
          <Image src={DALogo} style={{ height: 65 }} />
          <Image src={LINKlogo} style={{ height: 65 }} />
        </div>
        <div className="form__container">
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
          toggleFavoriteClass={toggleFavoriteClass}
          search={form.search}
          department={form.department}
        />
      </div>
    </AuthWrapper>
  );
};

export default Main;
