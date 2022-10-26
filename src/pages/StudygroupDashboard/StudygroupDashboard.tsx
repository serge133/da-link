import {
  Database,
  getDatabase,
  onValue,
  ref,
  set,
  update,
} from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import GroupCharacteristics from "../../Components/GroupCharacteristics";
import NavigationBar from "../../Components/Navbar";
import app from "../../database/firebase";
import useAuth, { AuthWrapper } from "../../useAuth";
import { StudyGroupType } from "../Class/ClassPage";
import "./StudygroupDashboard.css";

type Props = {};

const Description = () => (
  <Card className="description-card">
    <Card.Title>Welcome</Card.Title>
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

export type StudyGroupVoteType = {
  liked: boolean;
  disliked: boolean;
  workhard: boolean;
  socialize: boolean;
};

const EMPTY_STUDYGROUP = {
  id: "",
  name: "",
  author: "",
  private: false,
  workhardVotes: 0,
  socializingVotes: 0,
  totalPeople: 0,
  totalLikes: 0,
  totalDislikes: 0,
  liked: false,
  disliked: false,
  workhard: false,
  socialize: false,
};

const StudygroupDashboard = (props: Props) => {
  const { crn, department, studygroupID } = useParams();
  const { user } = useAuth();
  const [state, setState] = useState<StudyGroupType & StudyGroupVoteType>(
    EMPTY_STUDYGROUP
  );
  const STUDYGROUP_URL = ``;
  const USER_STUDYGROUP_URL = ``;

  const getRef = useCallback(
    (db: Database) => {
      const userStudyGroupRef = ref(
        db,
        `/users/${user?.uid}/studygroups/${studygroupID}/votes`
      );
      const studygroupRef = ref(db, `/studygroups/${crn}/${studygroupID}`);

      return [userStudyGroupRef, studygroupRef];
    },
    [user]
  );

  // Fetches once
  useEffect(() => {
    const db = getDatabase(app);
    // const studygroupRef = ref(db, `/studygroups/${crn}/${studygroupID}`);
    // const userStudyGroupRef = ref(
    //   db,
    //   `/users/${user?.uid}/studygroups/${studygroupID}/votes`
    // );
    const [userStudyGroupRef, studygroupRef] = getRef(db);

    onValue(studygroupRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const response: StudyGroupType = data;
        setState((prevState) => ({ ...prevState, ...response }));
        // setStudyGroups(response);
      }
    });
    onValue(userStudyGroupRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const response: StudyGroupVoteType = data;
        setState((prevState) => ({ ...prevState, ...response }));
        // setStudyGroups(response);
      }
    });
  }, [getRef]);

  const handleVoteChange = {
    setDislike: () => {
      const db = getDatabase(app);
      const [userStudyGroupRef, studygroupRef] = getRef(db);

      update(studygroupRef, {
        totalDislikes: state.disliked
          ? state.totalDislikes - 1
          : state.totalDislikes + 1,
      });
      update(userStudyGroupRef, {
        disliked: !state.disliked,
      });
    },
    setLike: () => {
      const db = getDatabase(app);
      const [userStudyGroupRef, studygroupRef] = getRef(db);
      update(studygroupRef, {
        totalLikes: state.liked ? state.totalLikes - 1 : state.totalLikes + 1,
      });
      update(userStudyGroupRef, {
        liked: !state.liked,
      });
    },
    handleLike: () => {
      if (state.disliked) {
        handleVoteChange.setLike();
        handleVoteChange.setDislike();
      }
      handleVoteChange.setLike();
    },
    handleDislike: () => {
      if (state.liked) {
        handleVoteChange.setDislike();
        handleVoteChange.setLike();
      }
      handleVoteChange.setDislike();
    },
    setSocialize: () => {
      const db = getDatabase(app);
      const [userStudyGroupRef, studygroupRef] = getRef(db);
      update(studygroupRef, {
        socializingVotes: state.socialize
          ? state.socializingVotes - 1
          : state.socializingVotes + 1,
      });
      update(userStudyGroupRef, {
        socialize: !state.socialize,
      });
    },
    setWorkhard: () => {
      const db = getDatabase(app);
      const [userStudyGroupRef, studygroupRef] = getRef(db);
      update(studygroupRef, {
        workhardVotes: state.workhard
          ? state.workhardVotes - 1
          : state.workhardVotes + 1,
      });
      update(userStudyGroupRef, {
        workhard: !state.workhard,
      });
    },
    handleSocialize: () => {
      if (state.workhard) {
        handleVoteChange.setSocialize();
        handleVoteChange.setWorkhard();
      }
      handleVoteChange.setSocialize();
    },
    handleWorkhard: () => {
      if (state.socialize) {
        handleVoteChange.setWorkhard();
        handleVoteChange.setSocialize();
      }
      handleVoteChange.setWorkhard();
    },
  };

  return (
    <AuthWrapper>
      <div className="App studygroup-dashboard">
        <NavigationBar goBack={`/class/${crn}/${department}`} />
        <section className="side-bar">
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Welcome
            </ListGroup.Item>
            <ListGroup.Item as="li">Chatroom</ListGroup.Item>
            <ListGroup.Item as="li">Discord</ListGroup.Item>
            <ListGroup.Item as="li">Calendar</ListGroup.Item>
            <ListGroup.Item as="li">People</ListGroup.Item>
            <ListGroup.Item as="li">Settings (owner)</ListGroup.Item>
          </ListGroup>
        </section>
        <section className="main">
          <Description />
          <GroupCharacteristics
            workhardVotes={state.workhardVotes}
            socializingVotes={state.socializingVotes}
            totalDislikes={state?.totalDislikes ? state.totalDislikes : 0}
            totalLikes={state?.totalLikes ? state.totalLikes : 0}
            userLiked={state.liked}
            userDisliked={state.disliked}
            userSocialize={state.socialize}
            userWorkhard={state.workhard}
            handleVoteChange={handleVoteChange}
          />
        </section>
      </div>
    </AuthWrapper>
  );
};

export default StudygroupDashboard;
