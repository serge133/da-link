import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
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
  likes: {},
  dislikes: {},
  workhardVotes: {},
  socializeVotes: {},
};

const StudygroupDashboard = (props: Props) => {
  const { crn, department, studygroupID } = useParams();
  const { user } = useAuth();
  const [state, setState] = useState(EMPTY_STUDYGROUP);

  // Fetches once
  useEffect(() => {
    const db = getDatabase(app);
    const studygroupRef = ref(db, `/studygroups/${crn}/${studygroupID}`);
    // const userStudyGroupRef = ref(
    //   db,
    //   `/users/${user?.uid}/studygroups/${studygroupID}/votes`
    // );

    onValue(studygroupRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const response: StudyGroupType = data;
        setState((prevState: any) => ({ ...prevState, ...response }));
        // setStudyGroups(response);
      }
    });
    // onValue(userStudyGroupRef, (snapshot) => {
    //   const data = snapshot.val();
    //   if (data) {
    //     const response: StudyGroupVoteType = data;
    //     setState((prevState: any) => ({ ...prevState, ...response }));
    //     // setStudyGroups(response);
    //   }
    // });
  }, []);

  const handleVoteChange = {
    setDislike: () => {
      if (!user) return;
      const db = getDatabase(app);
      // const [userStudyGroupRef, studygroupRef] = getRef(db);
      // const likeRef = ref(db, `/studygroups/${crn}/${studygroupID}/likes/${user?.uid}`);
      const dislikeRef = ref(
        db,
        `/studygroups/${crn}/${studygroupID}/dislikes/${user.uid}`
      );

      if (user.uid in state.dislikes) {
        // Remove does not change state
        remove(dislikeRef);
        setState((prevState) => {
          const copyDislikes = { ...prevState.dislikes };
          delete copyDislikes[user.uid];

          return { ...prevState, dislikes: copyDislikes };
        });
      } else {
        set(dislikeRef, true);
      }
    },
    setLike: () => {
      if (!user) return;
      const db = getDatabase(app);
      // const [userStudyGroupRef, studygroupRef] = getRef(db);
      const likeRef = ref(
        db,
        `/studygroups/${crn}/${studygroupID}/likes/${user.uid}`
      );

      if (user.uid in state.likes) {
        remove(likeRef);
        setState((prevState) => {
          const copyLikes = { ...prevState.likes };
          delete copyLikes[user.uid];

          return { ...prevState, likes: copyLikes };
        });
      } else {
        set(likeRef, true);
      }
    },
    handleLike: () => {
      if (!user) return;
      if (user.uid in state.dislikes) {
        handleVoteChange.setLike();
        handleVoteChange.setDislike();
      }
      handleVoteChange.setLike();
    },
    handleDislike: () => {
      if (!user) return;
      if (user.uid in state.likes) {
        handleVoteChange.setDislike();
        handleVoteChange.setLike();
      }
      handleVoteChange.setDislike();
    },
    setWorkhard: () => {
      if (!user) return;
      const db = getDatabase(app);
      // const [userStudyGroupRef, studygroupRef] = getRef(db);
      const workhardRef = ref(
        db,
        `/studygroups/${crn}/${studygroupID}/workhardVotes/${user.uid}`
      );

      if (user.uid in state.workhardVotes) {
        remove(workhardRef);
        setState((prevState) => {
          const copyWorkhardVotes = { ...prevState.workhardVotes };
          delete copyWorkhardVotes[user.uid];

          return { ...prevState, workhardVotes: copyWorkhardVotes };
        });
      } else {
        set(workhardRef, true);
      }
    },
    setSocialize: () => {
      if (!user) return;
      const db = getDatabase(app);
      // const [userStudyGroupRef, studygroupRef] = getRef(db);
      const socializeRef = ref(
        db,
        `/studygroups/${crn}/${studygroupID}/socializeVotes/${user.uid}`
      );

      if (user.uid in state.socializeVotes) {
        remove(socializeRef);
        setState((prevState) => {
          const copySocializeVotes = { ...prevState.socializeVotes };
          delete copySocializeVotes[user.uid];

          return { ...prevState, socializeVotes: copySocializeVotes };
        });
      } else {
        set(socializeRef, true);
      }
    },
    // setSocialize: () => {
    // const db = getDatabase(app);
    //   const [userStudyGroupRef, studygroupRef] = getRef(db);
    //   update(studygroupRef, {
    //     socializingVotes: state.socialize
    //       ? state.socializingVotes - 1
    //       : state.socializingVotes + 1,
    //   });
    //   update(userStudyGroupRef, {
    //     socialize: !state.socialize,
    //   });
    // },
    // setWorkhard: () => {
    //   const db = getDatabase(app);
    //   const [userStudyGroupRef, studygroupRef] = getRef(db);
    //   update(studygroupRef, {
    //     workhardVotes: state.workhard
    //       ? state.workhardVotes - 1
    //       : state.workhardVotes + 1,
    //   });
    //   update(userStudyGroupRef, {
    //     workhard: !state.workhard,
    //   });
    // },
    handleSocialize: () => {
      if (!user) return;
      if (user.uid in state.workhardVotes) {
        handleVoteChange.setSocialize();
        handleVoteChange.setWorkhard();
      }
      handleVoteChange.setSocialize();
    },
    handleWorkhard: () => {
      if (!user) return;
      if (user.uid in state.socializeVotes) {
        handleVoteChange.setWorkhard();
        handleVoteChange.setSocialize();
      }
      handleVoteChange.setWorkhard();
    },
  };

  const getLen = (obj: Object): number => Object.values(obj).length;

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
          {user && (
            <GroupCharacteristics
              workhardVotes={getLen(state.workhardVotes)}
              socializingVotes={getLen(state.socializeVotes)}
              totalDislikes={getLen(state.dislikes)}
              totalLikes={getLen(state.likes)}
              userLiked={user.uid in state.likes}
              userDisliked={user.uid in state.dislikes}
              userSocialize={user.uid in state.socializeVotes}
              userWorkhard={user.uid in state.workhardVotes}
              handleVoteChange={handleVoteChange}
            />
          )}
        </section>
      </div>
    </AuthWrapper>
  );
};

export default StudygroupDashboard;
