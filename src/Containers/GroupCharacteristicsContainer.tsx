import { getDatabase, ref, remove, set } from "firebase/database";
import GroupCharacteristics from "../Components/GroupCharacteristics";
import useAuth from "../Contexts/useAuth";
import app from "../database/firebase";
import { StudyGroupVote } from "../database/models";

type Props = {
  voteState: {
    likes: { [crn: string]: true };
    dislikes: { [crn: string]: true };
    workhardVotes: { [crn: string]: true };
    socializeVotes: { [crn: string]: true };
  };
  setVoteState: (newVoteState: {
    likes?: StudyGroupVote;
    dislikes?: StudyGroupVote;
    workhardVotes?: StudyGroupVote;
    socializeVotes?: StudyGroupVote;
  }) => void;
  crn: string;
  studygroupID: string;
};

// Where all the voting happens
const GroupCharacteristicsContainer = (props: Props) => {
  const { user } = useAuth();
  const { voteState, setVoteState, studygroupID, crn } = props;

  const setDislike = () => {
    if (!user) return;
    const db = getDatabase(app);
    // const [userStudyGroupRef, studygroupRef] = getRef(db);
    // const likeRef = ref(db, `/studygroups/${crn}/${studygroupID}/likes/${user?.uid}`);
    const dislikeRef = ref(
      db,
      `/studygroups/${crn}/${studygroupID}/dislikes/${user.uid}`
    );

    if (user.uid in voteState.dislikes) {
      // Remove does not change voteState
      remove(dislikeRef);
      const copyDislikes: StudyGroupVote = { ...voteState.dislikes };
      delete copyDislikes[user.uid];
      setVoteState({ dislikes: copyDislikes });
      //   setVoteState((prevState) => {
      //     const copyDislikes: { [uid: string]: true } = {
      //       ...prevState.dislikes,
      //     };
      //     delete copyDislikes[user.uid];

      //     return { ...prevState, dislikes: copyDislikes };
      //   });
    } else {
      set(dislikeRef, true);
    }
  };
  const setLike = () => {
    if (!user) return;
    const db = getDatabase(app);
    // const [userStudyGroupRef, studygroupRef] = getRef(db);
    const likeRef = ref(
      db,
      `/studygroups/${crn}/${studygroupID}/likes/${user.uid}`
    );

    if (user.uid in voteState.likes) {
      remove(likeRef);
      const copyLikes: StudyGroupVote = { ...voteState.likes };
      delete copyLikes[user.uid];
      setVoteState({ likes: copyLikes });
    } else {
      set(likeRef, true);
    }
  };
  const handleLike = () => {
    if (!user) return;
    if (user.uid in voteState.dislikes) {
      setLike();
      setDislike();
    }
    setLike();
  };
  const handleDislike = () => {
    if (!user) return;
    if (user.uid in voteState.likes) {
      setDislike();
      setLike();
    }
    setDislike();
  };
  const setWorkhard = () => {
    if (!user) return;
    const db = getDatabase(app);
    // const [userStudyGroupRef, studygroupRef] = getRef(db);
    const workhardRef = ref(
      db,
      `/studygroups/${crn}/${studygroupID}/workhardVotes/${user.uid}`
    );

    if (user.uid in voteState.workhardVotes) {
      remove(workhardRef);

      const copyWorkhardVotes: StudyGroupVote = { ...voteState.workhardVotes };
      delete copyWorkhardVotes[user.uid];
      setVoteState({ workhardVotes: copyWorkhardVotes });
    } else {
      set(workhardRef, true);
    }
  };

  const setSocialize = () => {
    if (!user) return;
    const db = getDatabase(app);
    // const [userStudyGroupRef, studygroupRef] = getRef(db);
    const socializeRef = ref(
      db,
      `/studygroups/${crn}/${studygroupID}/socializeVotes/${user.uid}`
    );

    if (user.uid in voteState.socializeVotes) {
      remove(socializeRef);
      const copySocializeVotes: StudyGroupVote = {
        ...voteState.socializeVotes,
      };
      delete copySocializeVotes[user.uid];
      setVoteState({ socializeVotes: copySocializeVotes });
    } else {
      set(socializeRef, true);
    }
  };
  const handleSocialize = () => {
    if (!user) return;
    if (user.uid in voteState.workhardVotes) {
      setSocialize();
      setWorkhard();
    }
    setSocialize();
  };

  const handleWorkhard = () => {
    if (!user) return;
    if (user.uid in voteState.socializeVotes) {
      setWorkhard();
      setSocialize();
    }
    setWorkhard();
  };

  const getLen = (obj: Object): number => Object.values(obj).length;

  const isPressed = (obj: { [crn: string]: true }): boolean => {
    if (!obj || !user) return false;

    return user.uid in obj;
  };
  return user ? (
    <GroupCharacteristics
      workhardVotes={
        voteState.workhardVotes ? getLen(voteState.workhardVotes) : 0
      }
      socializingVotes={
        voteState.socializeVotes ? getLen(voteState.socializeVotes) : 0
      }
      totalDislikes={voteState.dislikes ? getLen(voteState.dislikes) : 0}
      totalLikes={voteState.likes ? getLen(voteState.likes) : 0}
      userLiked={isPressed(voteState.likes)}
      userDisliked={isPressed(voteState.dislikes)}
      userSocialize={isPressed(voteState.socializeVotes)}
      userWorkhard={isPressed(voteState.workhardVotes)}
      handleDislike={handleDislike}
      handleLike={handleLike}
      handleWorkhard={handleWorkhard}
      handleSocialize={handleSocialize}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default GroupCharacteristicsContainer;
