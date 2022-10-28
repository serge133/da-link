import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import app from "../../database/firebase";
import { StudyGroupType, StudyGroupVote } from "../../database/models";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import "./StudygroupDashboard.css";
import GroupCharacteristicsContainer from "../../Containers/GroupCharacteristicsContainer";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";

type Props = {};

const Description = (props: { name: string; children: string }) => (
  <Card className="description-card">
    <Card.Title>Welcome to {props.name}</Card.Title>
    <Card.Body>{props.children}</Card.Body>
  </Card>
);

const EMPTY_STUDYGROUP: StudyGroupType = {
  id: "",
  name: "",
  author: "",
  private: false,
  likes: {},
  dislikes: {},
  workhardVotes: {},
  socializeVotes: {},
  welcomeMessage: "",
  people: {},
};

const WelcomePage = (props: Props) => {
  const { crn, department, studygroupID } = useParams();
  const { user } = useAuth();

  const [studygroup, setStudygroup] =
    useState<StudyGroupType>(EMPTY_STUDYGROUP);

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

  const setVoteState = (newVoteState: {
    likes?: StudyGroupVote;
    dislikes?: StudyGroupVote;
    workhardVotes?: StudyGroupVote;
    socializeVotes?: StudyGroupVote;
  }) => {
    setStudygroup((prevState) => ({ ...prevState, ...newVoteState }));
  };

  return (
    <AuthWrapper>
      <div className="App studygroup-dashboard">
        <NavigationBar goBack={`/class/${crn}/${department}`} />
        <StudygroupDashboardContainer
          currentPage="welcome"
          crn={crn}
          studygroupID={studygroupID}
          department={department}
          isOwner={isOwner}
        >
          {studygroup.welcomeMessage && (
            <Description name={studygroup.name}>
              {studygroup.welcomeMessage}
            </Description>
          )}
          <GroupCharacteristicsContainer
            voteState={studygroup}
            setVoteState={setVoteState}
            studygroupID={studygroupID ? studygroupID : ""}
            crn={crn ? crn : ""}
          />
        </StudygroupDashboardContainer>
      </div>
    </AuthWrapper>
  );
};

export default WelcomePage;
