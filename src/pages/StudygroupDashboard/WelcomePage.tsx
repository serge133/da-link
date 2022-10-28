import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import app from "../../database/firebase";
import { StudyGroupType, StudyGroupVote } from "../../database/models";
import { AuthWrapper } from "../../Contexts/useAuth";
import "./StudygroupDashboard.css";
import GroupCharacteristicsContainer from "../../Containers/GroupCharacteristicsContainer";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";

type Props = {};

const Description = (props: { name: string }) => (
  <Card className="description-card">
    <Card.Title>Welcome to {props.name}</Card.Title>
    <Card.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia
      ultrices massa. Cras aliquet sed nunc in tempor. Vivamus eu massa cursus,
      ultricies magna vitae, aliquam ipsum. Etiam rhoncus, dolor a euismod
      gravida, turpis nisi rhoncus lacus, a dapibus magna elit id ipsum. In ut
      metus hendrerit, dictum est vitae, facilisis purus. Proin hendrerit urna
      vel ipsum laoreet accumsan. Suspendisse tempor, leo vel blandit pharetra,
      risus quam sodales ligula, nec aliquam mi ex ac orci. Proin dignissim id
      odio vitae blandit. Phasellus nibh enim, placerat sed odio non, cursus
      facilisis enim. Suspendisse consequat diam vel porta cursus. Fusce et
      libero nec magna convallis accumsan sed nec dui. Proin in enim sit amet
      lacus feugiat imperdiet. Suspendisse commodo tristique justo, vel mollis
      odio malesuada id. Ut dignissim vel nulla vel iaculis. Fusce congue cursus
      orci, vel vestibulum lorem. Vestibulum varius congue accumsan. Vestibulum
      id purus et leo hendrerit pulvinar in vitae lectus. Donec dictum dolor ut
      enim facilisis vestibulum. Integer finibus euismod velit in finibus. Sed
      pretium, quam vitae pulvinar cursus, erat sapien commodo nibh, eget mollis
      nisl augue in lorem. Phasellus finibus dui ac massa iaculis fringilla.
      Suspendisse potenti. Mauris at dolor mollis, lacinia ipsum at, malesuada
      nulla. Pellentesque a auctor metus, eget vestibulum quam. Proin vel massa
      sit amet nisi efficitur semper. Curabitur convallis malesuada ante vitae
      scelerisque. Donec finibus massa in ligula bibendum dapibus. Curabitur
      sodales ante tortor, ac euismod nibh efficitur eu. Curabitur quis commodo
      velit. Cras tristique rhoncus felis, id placerat erat egestas sit amet.
    </Card.Body>
  </Card>
);

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

const WelcomePage = (props: Props) => {
  const { crn, department, studygroupID } = useParams();

  const [studygroup, setStudygroup] =
    useState<StudyGroupType>(EMPTY_STUDYGROUP);

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
          isOwner={true}
        >
          <Description name={studygroup.name} />
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
