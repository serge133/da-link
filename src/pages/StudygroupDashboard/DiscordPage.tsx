import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import database from "../../database/firebase";
import { StudyGroupType } from "../../database/models";

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
const DiscordPage = () => {
  const { crn, department, studygroupID } = useParams();
  const [studygroup, setStudygroup] =
    useState<StudyGroupType>(EMPTY_STUDYGROUP);
  const { user } = useAuth();

  const isOwner = user.uid === studygroup.author;
  const belongsInStudyGroup = user.uid in studygroup.people;

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
        <NavigationBar />
        <StudygroupDashboardContainer
          currentPage="discord"
          crn={crn}
          studygroupID={studygroupID}
          department={department}
          isOwner={isOwner}
          allowedAccessToPage={belongsInStudyGroup}
        >
          <h1>Hi this is the discord page! </h1>
          <a href={studygroup.discord} target="_blank">
            Discord Link
          </a>
        </StudygroupDashboardContainer>
      </div>
    </AuthWrapper>
  );
};

export default DiscordPage;
