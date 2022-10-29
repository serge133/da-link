export interface Student {
  id: string;
  userName: string;
  description: string;
  className: string;
  professor: string;
  maxGroupSize: number;
  department: string;
  phoneNumber: number;
  discord: string;
}

// Notifacations from other users who want to join your studygroup
export type UserNotification = JoinStudygroupGroupNotification[];

export type MyClasses = { [crn: string]: boolean };

export type MyStudyGroups = {
  [studygroupID: string]: true;
};

export type User = {
  uid: string;
  refreshToken: string;
  firstName?: string;
  lastName?: string;
  notifications?: UserNotification;
  myClasses?: MyClasses;
  studygroups?: MyStudyGroups;
};

export type StudyGroupVote = {
  [crn: string]: true;
};

export type StudygroupPeopleType = {
  [uid: string]: true;
};

export type StudygroupPendingInvites = {
  [uid: string]: true;
};
export type StudyGroupType = {
  id: string;
  name: string;
  author: string;
  likes?: StudyGroupVote;
  dislikes?: StudyGroupVote;
  workhardVotes?: StudyGroupVote;
  socializeVotes?: StudyGroupVote;
  welcomeMessage?: string;
  people: StudygroupPeopleType;
  pendingInvites?: StudygroupPendingInvites;
};

export type JoinStudygroupGroupNotification = {
  uid: string;
  message: string;
  department: string;
  crn: string;
  studygroupID: string;
};
