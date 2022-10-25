import { Accordion, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { StudyGroupType } from "../../pages/Class/ClassPage";

type Props = {
  studygroups: StudyGroupType[];
  crn?: string;
  department?: string;
};

type StudygroupProps = {
  id: string;
  name: string;
  index: number;
  description: string;
  goToDashboard: (studygroupID: string) => void;
};

const Studygroup = ({
  id,
  name,
  index,
  description,
  goToDashboard,
}: StudygroupProps) => {
  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header>{name}</Accordion.Header>
      <Accordion.Body>
        {description}
        <div className="button-container">
          <Button variant="primary" onClick={() => goToDashboard(id)}>
            Open
          </Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const Studygroups = (props: Props) => {
  const navigate = useNavigate();

  const goToStudygroupDashboard = (studygroupID: string) =>
    navigate(`/studygroups/${props.crn}/${props.department}/${studygroupID}`);

  return (
    <Accordion defaultActiveKey="0">
      {props.studygroups.map((sg, i) => (
        <Studygroup
          index={i}
          id={sg.id}
          key={sg.id}
          name={sg.name}
          description="
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
          goToDashboard={goToStudygroupDashboard}
        />
      ))}
    </Accordion>
  );
};

export default Studygroups;
