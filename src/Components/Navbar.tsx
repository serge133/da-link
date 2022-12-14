import { Badge } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";
import useAuth from "../Contexts/useAuth";

type Props = {};

const NavigationBar = (props: Props) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const goToNotificationPage = () => {
    navigate(`/notifications`);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
      }}
    >
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>De Anza Link</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/app")}>Home</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => navigate("/my-classes")}>
              My Classes
            </Nav.Link>
            <Nav.Link id="notification-dropdown" onClick={goToNotificationPage}>
              Notifications{" "}
              {user.notifications.length > 0 && <Badge bg="primary">NEW</Badge>}
            </Nav.Link>
          </Nav>
          <Navbar.Text>
            Signed in as {user.firstName} {user.lastName}
            {/* <Button disabled={true}>Notifs</Button> */}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
