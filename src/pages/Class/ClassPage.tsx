import { ChangeEvent, useEffect, useState } from "react";
import { Accordion, Button, Dropdown } from "react-bootstrap";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import { Class } from "../../Containers/ClassesDisplay/ClassesDisplay";
import classes from "../../database/raw/classes.json";
import useAuth, { AuthWrapper } from "../../useAuth";
import CreateStudyGroupForm from "../../Containers/CreateStudyGroupForm";
import "./ClassPage.css";
import { getDatabase, onValue, ref, set } from "firebase/database";
import app from "../../database/firebase";
import { uuidv4 } from "@firebase/util";
import Studygroups from "../../Containers/Studygroups/Studygroups";
import ErrorHandler from "../../Containers/ErrorHandler/ErrorHandler";

type Props = {};

const defaultStudyGroupForm = {
  name: "",
  private: false,
};

export type StudyGroupType = {
  id: string;
  name: string;
  author: string;
  private: boolean;
  workhardVotes: number;
  socializingVotes: number;
  totalPeople: number;
  totalLikes: number;
  totalDislikes: number;
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
        console.log("rendered");
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
      workhardVotes: 0,
      socializingVotes: 0,
      totalPeople: 1,
      totalLikes: 0,
      totalDislikes: 0,
    };
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
          />
        </ErrorHandler>
        {/* {!loading && classData ? <></> : <h1>Sorry Class does not exist</h1>} */}
      </div>
    </AuthWrapper>
  );
};

export default ClassPage;
