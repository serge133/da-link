import { Accordion, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { StudyGroupType } from "../../database/models";

type Props = {
  studygroups: StudyGroupType[];
  crn?: string;
  department?: string;
  uid?: string;
};

type StudygroupProps = {
  id: string;
  name: string;
  index: number;
  description?: string;
  goToDashboard: (studygroupID: string) => void;
  handleClick: (studygroupID: string, isOwner: boolean) => void;
  isOwner: boolean;
};

const Studygroup = ({
  id,
  name,
  index,
  description,
  goToDashboard,
  isOwner,
  handleClick,
}: StudygroupProps) => {
  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header>{name}</Accordion.Header>
      <Accordion.Body>
        {description}
        <div className="button-container">
          <Button variant="primary" onClick={() => handleClick(id, isOwner)}>
            {isOwner ? "Open" : "Ask To Join"}
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

  const handleClick = (studygroupID: string, isOwner: boolean) => {
    // If you are the owner you are allowed to open
    if (isOwner) {
      navigate(
        `/studygroups/${props.crn}/${props.department}/${studygroupID}/welcome`
      );
      return;
    }
  };

  return (
    <div className="accordion-container">
      <Accordion defaultActiveKey="0">
        {props.studygroups.map((sg, i) => (
          <Studygroup
            index={i}
            isOwner={props.uid === sg.author}
            id={sg.id}
            key={sg.id}
            name={sg.name}
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
