import "./Main.css";
import { ChangeEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import DALogo from "../../assets/DAC_Logo_Black.png";
import LINKlogo from "../../assets/link-logo.png";
import useAuth, { AuthWrapper } from "../../useAuth";
import ClassSearch from "../../Containers/ClassSearch/ClassSearch";
import ClassesDisplay from "../../Containers/ClassesDisplay/ClassesDisplay";

const defaultForm = {
  department: "",
  search: "",
};

const Main = () => {
  const [form, setForm] = useState(defaultForm);
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
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
        <ClassesDisplay search={form.search} department={form.department} />
      </div>
    </AuthWrapper>
  );
};

export default Main;
