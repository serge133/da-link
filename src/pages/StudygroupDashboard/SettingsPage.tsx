import { getDatabase, onValue, ref, update } from "firebase/database";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import ErrorHandler from "../../Containers/ErrorHandler/ErrorHandler";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import app from "../../database/firebase";
import { StudyGroupType } from "../../database/models";

type Props = {};

const EMPTY_STUDYGROUP = {
  id: "",
  name: "",
  author: "",
  private: false,
  likes: {},
  dislikes: {},
  workhardVotes: {},
  socializeVotes: {},
};

const SettingsPage = (props: Props) => {
  const { crn, department, studygroupID } = useParams();

  const { user } = useAuth();
  const [studygroup, setStudygroup] =
    useState<StudyGroupType>(EMPTY_STUDYGROUP);

  const [saved, setSaved] = useState(true);

  const isOwner = user?.uid === studygroup.author;

  // Fetches once
  useEffect(() => {
    const db = getDatabase(app);
    const studygroupRef = ref(db, `/studygroups/${crn}/${studygroupID}`);

    onValue(studygroupRef, (snapshot) => {
      const data: StudyGroupType = snapshot.val();

      if (data) {
        setStudygroup((prevState) => ({ ...prevState, ...data }));
      }
    });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSaved(false);
    setStudygroup((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const db = getDatabase(app);
    const studygroupRef = ref(db, `/studygroups/${crn}/${studygroupID}`);
    update(studygroupRef, studygroup);

    setSaved(true);
    console.log("saved", studygroup.welcomeMessage);
  };

  return (
    <AuthWrapper>
      <div className="App studygroup-dashboard">
        <NavigationBar goBack={`/class/${crn}/${department}`} />
        <StudygroupDashboardContainer
          currentPage="settings"
          crn={crn}
          studygroupID={studygroupID}
          department={department}
          isOwner={isOwner}
        >
          <ErrorHandler
            allHasToBeTrueOrElseFail={[isOwner]}
            errMessage="You are not the owner :("
          >
            <div className="settings-page">
              <div className="main">
                <h1>Settings</h1>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Studygroup Name
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Studygroup Name"
                    aria-label="Studygroup Name"
                    aria-describedby="basic-addon1"
                    name="name"
                    value={studygroup.name}
                    onChange={handleChange}
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Text>
                    <div className="textarea-control">Welcome Message</div>
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    name="welcomeMessage"
                    onChange={handleChange}
                    value={studygroup.welcomeMessage}
                    aria-label="With textarea"
                  />
                </InputGroup>
              </div>
              <div className="button-container">
                <Button variant="primary" onClick={handleSave} disabled={saved}>
                  Save
                </Button>
              </div>
            </div>
          </ErrorHandler>
        </StudygroupDashboardContainer>
      </div>
    </AuthWrapper>
  );
};

export default SettingsPage;
