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
import useAuth from "../../useAuth";

type SignupProps = {};

const signupForm = {
  email: "",
  studentId: "",
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
    if (form.confirmPassword !== form.password) return;
    signUp(form.email, form.studentId, form.password);
  };

  const redirectLogin = () => navigate("/login");

  return (
    <div className="signup-page">
      <Card className="login-card">
        <div className="logo-container">
          <img src={DALogo} />
          <img src={DALinkLogo} />
          {/** <svg className='logo' viewBox="0 0 500 500" version="1.1" id="svg_null"><g id="root" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="background" fill="#FFF" x="0" y="0" width="70" height="70"></rect><g id="shape.primary" transform="translate(125.000000, 80.000000)" fill="#f33535"><g><path d="M16.397 233.62l-15.52 15.518l0 -248.276l31.033 217.243l-15.513 15.515zm217.21 -217.243l15.516 -15.515l0 248.276l-31.029 -217.246l15.514 -15.515z" fill-opacity=".6"></path><path d="M47.422 202.592l-15.514 15.515l-31.031 -217.243l62.068 186.206l-15.523 15.522zm155.161 -155.177l15.513 -15.525l31.027 217.246l-62.06 -186.199l15.52 -15.522z" fill-opacity=".5"></path><path d="M78.456 171.554l-15.514 15.518l-62.065 -186.209l93.095 155.176l-15.516 15.515zm93.093 -93.104l15.516 -15.515l62.058 186.201l-93.087 -155.168l15.513 -15.518z" fill-opacity=".4"></path><path d="M233.617 16.394l-15.506 15.515l-217.233 -30.955l248.245 -0.09l-15.506 15.53zm-217.227 217.22l15.503 -15.516l217.23 30.955l-248.246 0.085l15.513 -15.525z" fill-opacity=".03"></path><path d="M202.592 47.431l-15.506 15.523l-186.208 -62l217.235 30.953l-15.52 15.524zm-155.185 155.145l15.514 -15.53l186.2 62.007l-217.23 -30.953l15.516 -15.524z" fill-opacity=".05"></path><path d="M171.573 78.477l-15.504 15.524l-155.191 -93.047l186.21 61.998l-15.515 15.525zm-93.141 93.044l15.506 -15.522l155.184 93.054l-186.203 -62.007l15.513 -15.525z" fill-opacity=".1"></path><path d="M140.557 109.521l-15.554 15.482l-124.126 -124.051l155.194 93.047l-15.514 15.522zm-31.107 30.965l15.545 -15.484l124.128 124.053l-155.187 -93.054l15.514 -15.515z" fill-opacity=".2"></path><path d="M125 124.998l15.515 -15.517l15.52 -15.513l92.865 154.79l0.223 0.296l-0.124 -0.131l0.124 0.214l-0.296 -0.386l-123.83 -123.744l-15.508 15.51l-15.518 15.522l-92.866 -154.792l-0.228 -0.294l0.13 0.131l-0.13 -0.22l0.303 0.393l123.82 123.741z" fill-opacity=".3"></path></g><g><path d="M16.39 125.002l-15.513 0l124.126 -124.14l-93.1 124.14l-15.513 0zm217.218 -0.007l15.515 0.008l-124.12 124.135l93.091 -124.143l15.514 0z" fill-opacity=".6"></path><path d="M47.422 125.002l-15.521 0l93.102 -124.14l-62.058 124.14l-15.523 0zm155.161 0l15.513 -0.007l-93.094 124.143l62.06 -124.136l15.521 0z" fill-opacity=".5"></path><path d="M78.456 125.002l-15.514 0l62.061 -124.14l-31.031 124.14l-15.516 0zm93.093 0l15.516 0l-62.063 124.136l31.034 -124.143l15.513 0.007z" fill-opacity=".4"></path><path d="M233.608 125.012l-15.514 0l-93.133 -124.102l124.162 124.092l-15.515 0.01zm-217.218 -0.017l15.513 0l93.14 124.1l-124.166 -124.092l15.513 -0.008z" fill-opacity=".03"></path><path d="M202.574 125.012l-15.511 0.017l-62.102 -124.119l93.136 124.102l-15.523 0zm-155.152 -0.026l15.523 -0.007l62.097 124.116l-93.141 -124.1l15.52 -0.01z" fill-opacity=".05"></path><path d="M171.549 125.029l-15.513 0.007l-31.073 -124.126l62.102 124.119l-15.516 0zm-93.093 -0.05l15.516 -0.017l31.07 124.133l-62.1 -124.116l15.514 0z" fill-opacity=".1"></path><path d="M140.515 125.036l-15.514 -0.034l-0.038 -124.092l31.075 124.126l-15.523 0zm-31.032 -0.074l15.513 0.034l0.046 124.1l-31.072 -124.134l15.513 0z" fill-opacity=".2"></path><path d="M125.002 124.996l15.512 0l15.523 0l-30.961 123.845l-0.034 0.252l0 -0.128l-0.039 0.172l0.039 -0.347l-0.046 -123.786l-15.513 0l-15.513 0l30.959 -123.838l0.034 -0.254l0 0.12l0.039 -0.169l-0.04 0.345l0.04 123.788z" fill-opacity=".3"></path></g></g><g id="Group" transform="translate(40.000000, 354.000000)"><rect id="Rectangle-10" x="0" y="0" width="420" height="46"></rect><text id="headerText" font-family="Josefin Sans" font-size="44" font-weight="600" line-spacing="44" letter-spacing="4.4" fill="#4A4A4A" data-text-alignment="C" font-style="normal"><tspan x="146.6471290588379" y="39">LINK</tspan></text></g><g id="Group-3" transform="translate(40.000000, 420.000000)"><rect id="Rectangle" x="0" y="0" width="420" height="30"></rect><text id="captionText" font-family="Josefin Sans" font-size="30" font-weight="300" line-spacing="30" letter-spacing="3" fill="#4A4A4A" data-text-alignment="C" font-style="normal"><tspan x="210" y="165"></tspan></text></g></g></svg> **/}
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

          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label>De Anza Student ID</Form.Label>
            <Form.Control
              name="studentId"
              onChange={handleChange}
              value={form.studentId}
              type="username"
              placeholder="Student ID"
            />
            <Form.Text className="text-muted">
              We'll never share your De Anza Student ID with anyone else.
            </Form.Text>
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
          {error.error && <h6 className="danger">{error.message}</h6>}
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
