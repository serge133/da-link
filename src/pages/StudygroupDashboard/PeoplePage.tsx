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

const PeoplePage = (props: Props) => {
  const { crn, department, studygroupID } = useParams();

  const { user } = useAuth();

  const [studygroup, setStudygroup] =
    useState<StudyGroupType>(EMPTY_STUDYGROUP);

  const isOwner = user.uid === studygroup.author;
  const belongsInStudyGroup = user.uid in studygroup.people;

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
        <NavigationBar />
        <StudygroupDashboardContainer
          currentPage="people"
          crn={crn}
          studygroupID={studygroupID}
          department={department}
          isOwner={isOwner}
          allowedAccessToPage={belongsInStudyGroup}
        >
          <h1>Hi this is the People page! </h1>
          {Object.values(studygroup.people).map((person) => (
            <h1 key={person.uid}>{person.displayName}</h1>
          ))}
        </StudygroupDashboardContainer>
      </div>
    </AuthWrapper>
  );
};

export default PeoplePage;
