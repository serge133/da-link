import { getDatabase, ref, remove, set } from "firebase/database";
import { createContext, ReactNode, useState } from "react";
import app from "../database/firebase";
import { StudyGroupType } from "../database/models";
import useAuth from "./useAuth";

interface StudygroupContextType {
  handleLike: () => void;
  handleDislike: () => void;
}

const StudygroupContext = createContext<StudygroupContextType>(
  {} as StudygroupContextType
);

export const StudygroupProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [studygroup, setStudygroup] = useState<StudyGroupType>(
    {} as StudyGroupType
  );
  const { user } = useAuth();

  function setDislike(crn: string) {
    if (!user) return;
    const db = getDatabase(app);
    // const [userStudyGroupRef, studygroupRef] = getRef(db);
    // const likeRef = ref(db, `/studygroups/${crn}/${studygroupID}/likes/${user?.uid}`);
    const dislikeRef = ref(
      db,
      `/studygroups/${crn}/${studygroup.id}/dislikes/${user.uid}`
    );

    if (user.uid in studygroup.dislikes) {
      // Remove does not change state
      remove(dislikeRef);
      setStudygroup((prevState) => {
        const copyDislikes: { [uid: string]: true } = {
          ...prevState.dislikes,
        };
        delete copyDislikes[user.uid];

        return { ...prevState, dislikes: copyDislikes };
      });
    } else {
      set(dislikeRef, true);
    }
  }

  function setLike(crn: string) {
    if (!user) return;
    const db = getDatabase(app);
    // const [userStudyGroupRef, studygroupRef] = getRef(db);
    const likeRef = ref(
      db,
      `/studygroups/${crn}/${studygroup.id}/likes/${user.uid}`
    );

    if (user.uid in studygroup.likes) {
      remove(likeRef);
      setStudygroup((prevState) => {
        const copyLikes: { [uid: string]: true } = { ...prevState.likes };
        delete copyLikes[user.uid];

        return { ...prevState, likes: copyLikes };
      });
    } else {
      set(likeRef, true);
    }
  }

  function handleLike(crn: string) {
    if (!user) return;
    if (user.uid in studygroup.dislikes) {
      setLike(crn, studygroupID);
      setDislike(crn, studygroupID);
    }
    setLike(crn, studygroupID);
  }

  function handleDislike(crn: string) {
    if (!user) return;
    if (user.uid in studygroup.likes) {
      setDislike(crn, studygroupID);
      setLike(crn, studygroupID);
    }
    setDislike(crn);
  }

  function setWorkhard(crn: string) {
    if (!user) return;
    const db = getDatabase(app);
    // const [userStudyGroupRef, studygroupRef] = getRef(db);
    const workhardRef = ref(
      db,
      `/studygroups/${crn}/${studygroup.id}/workhardVotes/${user.uid}`
    );

    if (user.uid in studygroup.workhardVotes) {
      remove(workhardRef);
      setStudygroup((prevState) => {
        const copyWorkhardVotes: { [uid: string]: true } = {
          ...prevState.workhardVotes,
        };
        delete copyWorkhardVotes[user.uid];

        return { ...prevState, workhardVotes: copyWorkhardVotes };
      });
    } else {
      set(workhardRef, true);
    }
  }

  function setSocialize(crn: string) {
    if (!user) return;
    const db = getDatabase(app);
    // const [userStudyGroupRef, studygroupRef] = getRef(db);
    const socializeRef = ref(
      db,
      `/studygroups/${crn}/${studygroup.id}/socializeVotes/${user.uid}`
    );

    if (user.uid in studygroup.socializeVotes) {
      remove(socializeRef);
      setStudygroup((prevState) => {
        const copySocializeVotes: { [uid: string]: true } = {
          ...prevState.socializeVotes,
        };
        delete copySocializeVotes[user.uid];

        return { ...prevState, socializeVotes: copySocializeVotes };
      });
    } else {
      set(socializeRef, true);
    }
  }

  function handleSocialize(crn: string) {
    if (!user) return;
    if (user.uid in studygroup.workhardVotes) {
      setSocialize(crn);
      handleVoteChange.setWorkhard();
    }
    handleVoteChange.setSocialize();
  }

  function handleWorkhard() {
    if (!user) return;
    if (user.uid in state.socializeVotes) {
      handleVoteChange.setWorkhard();
      handleVoteChange.setSocialize();
    }
    handleVoteChange.setWorkhard();
  }
};
