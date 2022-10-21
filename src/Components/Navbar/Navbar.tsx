import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";
import useAuth from "../../useAuth";

type Props = {
  goBack?: string;
};

const NavigationBar = (props: Props) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const goBack = () => {
    if (props.goBack) {
      navigate(props.goBack);
    }
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ position: "absolute", top: 0, left: 0, width: "100vw" }}
    >
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>De Anza Link</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/app")}>Home</Nav.Link>
            {props.goBack && <Nav.Link onClick={goBack}>Back</Nav.Link>}
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              {/* <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Separated link</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
