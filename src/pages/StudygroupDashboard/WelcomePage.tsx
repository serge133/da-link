import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import { StudyGroupType, StudyGroupVote } from "../../database/models";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import "./StudygroupDashboard.css";
import GroupCharacteristicsContainer from "../../Containers/GroupCharacteristicsContainer";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";
import database from "../../database/firebase";
import ErrorHandler from "../../Containers/ErrorHandler/ErrorHandler";

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
  const belongsInStudyGroup = user?.uid ? user.uid in studygroup.people : false;

  // Fetches once
  useEffect(() => {
    const studygroupRef = ref(database, `/studygroups/${crn}/${studygroupID}`);

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
          allowedAccessToPage={isOwner || belongsInStudyGroup}
        >
          {studygroup.welcomeMessage && (
            <Description name={studygroup.name}>
              {studygroup.welcomeMessage}
            </Description>
          )}
          <GroupCharacteristicsContainer
            voteState={{
              likes: studygroup.likes,
              dislikes: studygroup.dislikes,
              workhardVotes: studygroup.workhardVotes,
              socializeVotes: studygroup.socializeVotes,
            }}
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
