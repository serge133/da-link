import Button from "react-bootstrap/Button";
import "./Signup.css";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import DALogo from "../../assets/DAC_Logo_Black.png";
import DALinkLogo from "../../assets/link-logo.png";
import { ChangeEvent, useEffect, useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import app from "../../database/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../Contexts/useAuth";
import Logo from "../../Components/Logo";

type SignupProps = {};

const signupForm = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

const SignupPage = (props: SignupProps) => {
  const [form, setForm] = useState(signupForm);
  const navigate = useNavigate();

  const { signUp, loading, error } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    signUp(
      form.email,
      form.password,
      form.confirmPassword,
      form.firstName,
      form.lastName
    );
  };

  const redirectLogin = () => navigate("/login");

  return (
    <div className="signup-page">
      <Card className="login-card">
        <div className="logo-container">
          <img src={DALogo} />
          <Logo height={50} />
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              onChange={handleChange}
              value={form.email}
              placeholder="Enter Email"
            />
            <Form.Text className="text-muted">
              We'll never share your Email Address with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              type="username"
              placeholder="First Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={form.lastName}
              name="lastName"
              onChange={handleChange}
              type="username"
              placeholder="Last Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleChange}
              value={form.password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="reenterPass">
            <Form.Label>Re-Enter Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              onChange={handleChange}
              value={form.confirmPassword}
              type="password"
              placeholder="Re-Enter Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          {error.error && <h6 style={{ color: "red" }}>{error.message}</h6>}
          <div className="row-buttons">
            <Button disabled={loading} onClick={handleSubmit} variant="primary">
              Sign-Up
            </Button>
            <Button
              className="ms-3"
              disabled={loading}
              onClick={redirectLogin}
              variant="light"
            >
              Already a User?
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignupPage;
