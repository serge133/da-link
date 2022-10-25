import {
  ButtonGroup,
  Card,
  ListGroup,
  ProgressBar,
  ToggleButton,
} from "react-bootstrap";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import { AuthWrapper } from "../../useAuth";
import "./StudygroupDashboard.css";

type Props = {};

/**
 * When we fetch a study group we will get the information about it
 * What class it is for
 * What people are in it
 * etc.
 * So when we recieve this information we can go back a page
 */
const StudygroupDashboard = (props: Props) => {
  const { crn, department, studygroupID } = useParams();

  return (
    <AuthWrapper>
      <div className="App studygroup-dashboard">
        <NavigationBar goBack={`/class/${crn}/${department}`} />
        <section className="side-bar">
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Welcome
            </ListGroup.Item>
            <ListGroup.Item as="li">Chatroom</ListGroup.Item>
            <ListGroup.Item as="li">Discord</ListGroup.Item>
            <ListGroup.Item as="li">Calendar</ListGroup.Item>
            <ListGroup.Item as="li">People</ListGroup.Item>
          </ListGroup>
        </section>
        <section className="main">
          <Card>
            <Card.Title>Group Characteristics</Card.Title>
            <Card.Body className="ratings">
              <div className="rating">
                <h5>Work Efficiency</h5>
                <ProgressBar variant="danger" now={40} label="40%" />
              </div>
              <div className="rating">
                <h5>Socializing</h5>
                <ProgressBar variant="success" now={20} label="20%" />
              </div>

              <div className="rating">
                <h5>Rating</h5>
                <ProgressBar variant="warning" now={90} label="90%" />
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="rate-control">
                <ButtonGroup>
                  <ToggleButton
                    value="test"
                    type="radio"
                    variant="outline-danger"
                    name="radio"
                  >
                    Dislike
                  </ToggleButton>
                  <ToggleButton
                    value="test"
                    type="radio"
                    variant="outline-success"
                    name="radio"
                    checked={true}
                  >
                    {"  "}Like
                  </ToggleButton>
                </ButtonGroup>
              </div>
            </Card.Footer>
          </Card>
        </section>
      </div>
    </AuthWrapper>
  );
};

export default StudygroupDashboard;
