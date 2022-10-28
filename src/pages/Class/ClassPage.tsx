import { ChangeEvent, useEffect, useState } from "react";
import { Accordion, Button, Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import { Class } from "../../Containers/ClassesDisplay/ClassesDisplay";
import classes from "../../database/raw/classes.json";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import CreateStudyGroupForm from "../../Containers/CreateStudyGroupForm";
import "./ClassPage.css";
import { getDatabase, onValue, ref, set, update } from "firebase/database";
import app from "../../database/firebase";
import { uuidv4 } from "@firebase/util";
import Studygroups from "../../Containers/Studygroups/Studygroups";
import ErrorHandler from "../../Containers/ErrorHandler/ErrorHandler";
import {
  JoinStudygroupGroupNotification,
  MyStudyGroups,
  StudyGroupType,
} from "../../database/models";

type Props = {};

const defaultStudyGroupForm = {
  name: "",
  private: false,
};

const ClassPage = (props: Props) => {
  // string s
  const { crn, department, search } = useParams();
  const [classData, setClassData] = useState<Class>();
  const [showStudyGroupModal, setShowStudyGroupModal] = useState(false);
  const [studyGroupForm, setStudyGroupForm] = useState(defaultStudyGroupForm);
  const [studyGroups, setStudyGroups] = useState<StudyGroupType[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Finds the class based on the crn given through the route params, then finds the class and renders the class
  useEffect(() => {
    setLoading(true);
    if (department !== undefined && department in classes) {
      // @ts-ignore
      const c: Class = classes[department].filter(
        (el: Class) => el.crn === crn
      )[0];
      setClassData(c);
      setLoading(false);
    }
  }, [department, crn]); // Gauranteed to not change

  // Fetches the studygroups
  useEffect(() => {
    const db = getDatabase(app);
    const studygroupRef = ref(db, `/studygroups/${crn}`);

    // This is an observer so it activates when data is being written to the data base
    // that is why i do not need to put a set state to createStudyGroup()
    onValue(studygroupRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const response: StudyGroupType[] = Object.values(data);
        setStudyGroups(response);
      }
    });
  }, []);

  const createStudyGroup = () => {
    if (!user) return;
    // One study group per user
    if (studyGroups.findIndex((el) => el.author === user.uid) >= 0) {
      console.log("already one study group");
      return;
    }

    const db = getDatabase(app);
    const studyGroupID = uuidv4();
    const studyGroupRef = ref(db, `/studygroups/${crn}/${studyGroupID}`);

    const studygroup: StudyGroupType = {
      ...studyGroupForm,
      id: studyGroupID,
      author: user.uid,
      likes: {},
      dislikes: {},
      workhardVotes: {},
      socializeVotes: {},
      people: { [user.uid]: true },
    };
    console.log(studygroup);
    // An author is added
    set(studyGroupRef, studygroup);
    setStudyGroupForm(defaultStudyGroupForm);
    setShowStudyGroupModal(false);
  };

  const showCreateStudyGroupModal = () => setShowStudyGroupModal(true);
  const closeCreateStudyGroupModal = () => setShowStudyGroupModal(false);

  const handleChangeStudyGroupForm = (e: ChangeEvent<HTMLInputElement>) => {
    setStudyGroupForm((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  // Handles joining the study group and openning it
  const handleClickStudygroup = (
    belongsInGroup: boolean,
    studygroup: StudyGroupType
  ) => {
    // If you are the owner you are allowed to open always
    if (belongsInGroup) {
      navigate(`/studygroups/${crn}/${department}/${studygroup.id}/welcome`);
      return;
    }

    console.log(
      "You do not belong in the group will send the owner a notification"
    );
    if (!user || !department || !crn) return;

    const db = getDatabase(app);
    const notificationRef = ref(
      db,
      `/users/${studygroup.author}/notifications/${user.uid}`
    );
    const notification: JoinStudygroupGroupNotification = {
      uid: user.uid,
      message: `${user.firstName} ${user.lastName} Would like to join your Studygroup ${studygroup.name}`,
      department,
      crn,
      studygroupID: studygroup.id,
    };
    set(notificationRef, notification);
    const userStudygroupRef = ref(db, `/users/${user.uid}/studygroups`);
    const newStudyGroup: MyStudyGroups = {
      [studygroup.id]: true,
    };
    update(userStudygroupRef, newStudyGroup);

    const pendingInviteStudygroupRef = ref(
      db,
      `/studygroups/${crn}/${studygroup.id}/pendingInvites`
    );
    update(pendingInviteStudygroupRef, {
      [user.uid]: true,
    });
    console.log("Sent Notification");
  };
  return (
    <AuthWrapper>
      <div className="App class-page">
        <NavigationBar
          goBack={`/app/${department}${search ? "/" + search : ""}`}
        />
        {showStudyGroupModal && (
          <CreateStudyGroupForm
            show={showStudyGroupModal}
            close={closeCreateStudyGroupModal}
            form={studyGroupForm}
            handleChange={handleChangeStudyGroupForm}
            onSubmit={createStudyGroup}
          />
        )}
        <ErrorHandler
          errMessage="Class Does Not Exist :("
          allHasToBeTrueOrElseFail={[!loading, classData !== undefined]}
        >
          <section className="class-information">
            <h4 className="crn">{classData?.crn}</h4>
            <h4>{classData?.professor}</h4>
            <h6>{classData?.times}</h6>
            <h6>{classData?.type}</h6>
            <h6>{classData?.id}</h6>
            <h6>{classData?.className}</h6>
            <h6>{classData?.section}</h6>
          </section>
          <section className="studygroup-controls">
            <Dropdown drop="end">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={showCreateStudyGroupModal}>
                  Create Studygroup
                </Dropdown.Item>
                <Dropdown.Item>Message All</Dropdown.Item>
                <Dropdown.Item>Post Announcement</Dropdown.Item>
                <Dropdown.Item>Search</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </section>
          <Studygroups
            crn={crn}
            department={department}
            studygroups={studyGroups}
            handleClick={handleClickStudygroup}
          />
        </ErrorHandler>
        {/* {!loading && classData ? <></> : <h1>Sorry Class does not exist</h1>} */}
      </div>
    </AuthWrapper>
  );
};

export default ClassPage;
