import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
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

const ChatroomPage = (props: Props) => {
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
