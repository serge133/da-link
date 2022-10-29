import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";
import useAuth from "../Contexts/useAuth";

type Props = {
  goBack?: string;
};

const NavigationBar = (props: Props) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const goBack = () => {
    if (props.goBack) {
      navigate(props.goBack);
    }
  };

  const handleNotificationClick = () => {
    navigate(`/notifications`);
  };

  // console.log(Object.values(user?.notifications));

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
        <Navbar.Brand onClick={() => navigate("/")}>
          {/* <Logo height={30} /> */}
          De Anza Link
        </Navbar.Brand>
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
            <NavDropdown
              title={
                user?.notifications && user.notifications.length > 0
                  ? `${user.notifications.length} Notifications`
                  : "No Notifications"
              }
              id="notification-dropdown"
            >
              {user?.notifications &&
                user.notifications.map((n) => (
                  <NavDropdown.Item
                    onClick={handleNotificationClick}
                    key={`${n.studygroupID}-${n.uid}`}
                  >
                    {n.message}
                  </NavDropdown.Item>
                ))}
              <NavDropdown.Item onClick={handleNotificationClick}>
                Go To Notifications
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Text>
            Signed in as {user?.firstName} {user?.lastName}
            {/* <Button disabled={true}>Notifs</Button> */}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
