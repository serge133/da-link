import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./Login.css";
import DALogo from "../../assets/DAC_Logo_Black.png";
import useAuth from "../../Contexts/useAuth";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
// import NavigationBar from "../../Components/Navbar";
import Logo from "../../Components/Logo/Logo";

type LoginProps = {};

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = (props: LoginProps) => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    login(form.email, form.password);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const redirectSignup = () => navigate("/signup");

  return (
    <div className="login-page">
      <Card className="login-card">
        <Logo height={40} />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              onChange={handleChange}
              value={form.password}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          {error.error && <h6 style={{ color: "red" }}>{error.message}</h6>}
          <div className="row-buttons">
            <Button disabled={loading} onClick={handleSubmit} variant="primary">
              Log-In
            </Button>
            <Button
              className="ms-3"
              disabled={loading}
              onClick={redirectSignup}
              variant="light"
            >
              New User?
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
