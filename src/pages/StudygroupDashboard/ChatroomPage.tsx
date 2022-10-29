import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import database from "../../database/firebase";
import { StudyGroupType } from "../../database/models";

type Props = {};

const EMPTY_STUDYGROUP: StudyGroupType = {
  id: "",
  name: "",
  author: "",
  likes: {},
  dislikes: {},
  workhardVotes: {},
  socializeVotes: {},
  people: {},
  welcomeMessage: "",
};

const ChatroomPage = (props: Props) => {
  const { crn, department, studygroupID } = useParams();
  const { user } = useAuth();

  const [studygroup, setStudygroup] =
    useState<StudyGroupType>(EMPTY_STUDYGROUP);

  const isOwner = user?.uid === studygroup.author;

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

  return (
    <AuthWrapper>
      <div className="App studygroup-dashboard">
        <NavigationBar goBack={`/class/${crn}/${department}`} />
        <StudygroupDashboardContainer
          currentPage="chatroom"
          crn={crn}
          studygroupID={studygroupID}
          department={department}
          isOwner={isOwner}
        >
          <h1>Hi this is the chatroom page! </h1>
        </StudygroupDashboardContainer>
      </div>
    </AuthWrapper>
  );
};

export default ChatroomPage;
