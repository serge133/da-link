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

export type MyClass = {
  crn: string;
  department: string;
};
export type MyClasses = { [crn: string]: Class };

export type Class = {
  crn: string;
  id: string;
  section: string;
  classStatus: string;
  className: string;
  times: string;
  professor: string;
  type: string;
  department?: string;
};

// Display name is {firstName} {lastName}
export type Message = {
  timestamp: number; // Unix time
  text: string;
  displayName: string;
  uid: string;
};

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

export type StudygroupPerson = {
  uid: string;
  displayName: string;
};
export type StudygroupPeopleType = {
  [uid: string]: StudygroupPerson;
};

export type StudygroupPendingInvites = {
  [uid: string]: true;
};
export type StudyGroupType = {
  id: string;
  name: string;
  author: string;
  likes: StudyGroupVote;
  dislikes: StudyGroupVote;
  workhardVotes: StudyGroupVote;
  socializeVotes: StudyGroupVote;
  welcomeMessage?: string;
  discord?: string;
  people: StudygroupPeopleType;
  pendingInvites?: StudygroupPendingInvites;
};

export type JoinStudygroupGroupNotification = {
  uid: string;
  displayName: string;
  message: string;
  department: string;
  crn: string;
  studygroupID: string;
};
