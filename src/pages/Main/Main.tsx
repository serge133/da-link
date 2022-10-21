import "./Main.css";
import { ChangeEvent, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import DALogo from "../../assets/DAC_Logo_Black.png";
import LINKlogo from "../../assets/link-logo.png";
import useAuth, { AuthWrapper } from "../../useAuth";
import ClassSearch from "../../Containers/ClassSearch/ClassSearch";
import ClassesDisplay from "../../Containers/ClassesDisplay/ClassesDisplay";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar/Navbar";

const Main = () => {
  const { department, search } = useParams();
  const [form, setForm] = useState({
    department: department ? department : "",
    search: search ? search : "",
  });
  const { logout } = useAuth();

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
        <ClassesDisplay search={form.search} department={form.department} />
      </div>
    </AuthWrapper>
  );
};

export default Main;
