import { ChangeEvent, useEffect, useState } from "react";
import { Accordion, Button, Dropdown } from "react-bootstrap";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar/Navbar";
import { Class } from "../../Containers/ClassesDisplay/ClassesDisplay";
import { classes } from "../../database/schoolData";
import useAuth, { AuthWrapper } from "../../useAuth";
import CreateStudyGroupForm from "../../Containers/CreateStudyGroupForm";
import "./ClassPage.css";
import { getDatabase, onValue, ref, set } from "firebase/database";
import app from "../../database/firebase";
import { uuidv4 } from "@firebase/util";
import Studygroups from "../../Containers/Studygroups/Studygroups";

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
};

const ClassPage = (props: Props) => {
  // string s
  const { crn, department, search } = useParams();
  const [classData, setClassData] = useState<Class>();
  const [showStudyGroupModal, setShowStudyGroupModal] = useState(false);
  const [studyGroupForm, setStudyGroupForm] = useState(defaultStudyGroupForm);
  const [studyGroups, setStudyGroups] = useState<StudyGroupType[]>([]);

  const { user } = useAuth();

  // Finds the class based on the crn given through the route params, then finds the class and renders the class
  useEffect(() => {
    const c: Class = classes[department].filter((c: Class) => c.crn === crn)[0];
    setClassData(c);
  }, [department, crn, setClassData]); // Gauranteed to not change

  // Fetches the studygroups
  useEffect(() => {
    const db = getDatabase(app);
    const studygroupRef = ref(db, `/studygroups/${crn}`);

    onValue(studygroupRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const response: StudyGroupType[] = Object.values(data);
        setStudyGroups(response);
      }
    });
  }, [crn]);

  const createStudyGroup = () => {
    const db = getDatabase(app);
    const studyGroupID = uuidv4();
    const studyGroupRef = ref(db, `/studygroups/${crn}/${studyGroupID}`);

    // An author is added
    set(studyGroupRef, {
      ...studyGroupForm,
      id: studyGroupID,
      author: user?.uid,
    });
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
      <div className="App">
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
          <Dropdown>
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
        <Studygroups studygroups={studyGroups} />
      </div>
    </AuthWrapper>
  );
};

export default ClassPage;
