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

export type StudyGroupVote = {
  [crn: string]: true;
};

export type PeopleType = {
  [uid: string]: true;
};

export type StudyGroupType = {
  id: string;
  name: string;
  author: string;
  private: boolean;
  likes: StudyGroupVote;
  dislikes: StudyGroupVote;
  workhardVotes: StudyGroupVote;
  socializeVotes: StudyGroupVote;
  welcomeMessage?: string;
  people: PeopleType;
};
