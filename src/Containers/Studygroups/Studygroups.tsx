import { Accordion, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { StudygroupPeopleType, StudyGroupType } from "../../database/models";

type Props = {
  studygroups: StudyGroupType[];
  crn?: string;
  department?: string;
  uid?: string;
};

type StudygroupProps = {
  uid: string;
  id: string;
  name: string;
  index: number;
  description?: string;
  goToDashboard: (studygroupID: string) => void;
  handleClick: (studygroupID: string, belongsInGroup: boolean) => void;
  isOwner: boolean;
  people: StudygroupPeopleType;
};

const Studygroup = ({
  uid,
  id,
  name,
  index,
  description,
  goToDashboard,
  isOwner,
  handleClick,
  people,
}: StudygroupProps) => {
  const belongsInGroup: boolean = uid in people;
  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header>{name}</Accordion.Header>
      <Accordion.Body>
        {description}
        <div className="button-container">
          <Button
            variant="primary"
            onClick={() => handleClick(id, belongsInGroup)}
          >
            {belongsInGroup ? "Open" : "Ask To Join"}
          </Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const Studygroups = (props: Props) => {
  const navigate = useNavigate();

  const goToStudygroupDashboard = (studygroupID: string) =>
    navigate(
      `/studygroups/${props.crn}/${props.department}/${studygroupID}/welcome`
    );

  const handleClick = (studygroupID: string, belongsInGroup: boolean) => {
    if (!props.uid) return;
    // If you are the owner you are allowed to open
    if (belongsInGroup) {
      navigate(
        `/studygroups/${props.crn}/${props.department}/${studygroupID}/welcome`
      );
      return;
    }

    console.log(
      "You do not belong in the group will send the owner a notification"
    );
  };

  return (
    <div className="accordion-container">
      <Accordion defaultActiveKey="0">
        {props.studygroups.map((sg, i) => (
          <Studygroup
            uid={props.uid ? props.uid : ""}
            index={i}
            isOwner={props.uid === sg.author}
            id={sg.id}
            key={sg.id}
            name={sg.name}
            people={sg.people}
            description={sg.welcomeMessage}
            goToDashboard={goToStudygroupDashboard}
            handleClick={handleClick}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default Studygroups;
