import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import useAuth from "../../Contexts/useAuth";
import { StudyGroupType } from "../../database/models";

type Props = {
  studygroups: StudyGroupType[];
  crn?: string;
  department?: string;
  handleClick: (belongsInGroup: boolean, studygroup: StudyGroupType) => void;
};

type StudygroupProps = {
  studygroup: StudyGroupType;
  index: number;
  uid: string;
  handleClick: (belongsInGroup: boolean, studygroup: StudyGroupType) => void;
  isOwner: boolean;
  pendingInvite: boolean;
};

const Studygroup = (props: StudygroupProps) => {
  const belongsInGroup: boolean = props.uid in props.studygroup.people;

  const buttonMessage = (): string => {
    if (belongsInGroup) {
      return "Open";
    } else if (props.pendingInvite) {
      return "Pending Invite";
    }

    return "Ask To Join";
  };
  return (
    <Accordion.Item eventKey={props.index.toString()}>
      <Accordion.Header>{props.studygroup.name}</Accordion.Header>
      <Accordion.Body>
        {props.studygroup.welcomeMessage}
        <div className="button-container">
          <Button
            variant="primary"
            onClick={() => props.handleClick(belongsInGroup, props.studygroup)}
            disabled={props.pendingInvite}
          >
            {buttonMessage()}
          </Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const Studygroups = (props: Props) => {
  const { user } = useAuth();

  // const goToStudygroupDashboard = (studygroupID: string) =>
  //   navigate(
  //     `/studygroups/${props.crn}/${props.department}/${studygroupID}/welcome`
  //   );

  return (
    <div className="accordion-container">
      <Accordion defaultActiveKey="0">
        {props.studygroups.map((sg, i) => (
          <Studygroup
            uid={user.uid}
            index={i}
            isOwner={user?.uid === sg.author}
            pendingInvite={
              sg.pendingInvites ? user.uid in sg.pendingInvites : false
            }
            key={sg.id}
            studygroup={sg}
            handleClick={props.handleClick}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default Studygroups;
