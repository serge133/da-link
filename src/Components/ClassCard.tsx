import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

type Props = {
  crn: string;
  isMyClass: boolean;
  className: string;
  classCode: string;
  professor: string;
  classStatus: string;
  handleDetailsClick: () => void;
  handleClickJoin: () => void;
};

const ClassCard = (props: Props) => {
  return (
    <Card
      style={{
        width: "18rem",
        height: 300,
        textAlign: "left",

        border: props.isMyClass ? "2px solid gold" : "",
      }}
      className="class-card"
      key={props.crn}
    >
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>
          {props.className} {props.classCode}
        </Card.Title>
        <Card.Subtitle style={{ marginBottom: 5 }}>
          {props.crn} |{"   "}
          <span style={{ color: "#171717", fontWeight: 200 }}>
            {props.professor}
          </span>
        </Card.Subtitle>
        <Card.Text>{props.classStatus}</Card.Text>
      </Card.Body>
      <div className="button-container">
        <Button variant="primary" onClick={props.handleDetailsClick}>
          Open
        </Button>
        <Button
          variant={props.isMyClass ? "warning" : "secondary"}
          onClick={props.handleClickJoin}
        >
          {props.isMyClass ? "Remove" : "Join"}
        </Button>
      </div>
      {/* <Card.Footer>20 Students 4 Groups</Card.Footer> */}
    </Card>
  );
};

export default ClassCard;
