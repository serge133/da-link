import { ref, set } from "firebase/database";
import { uuidv4 } from "@firebase/util";
import database from "./firebase";

export const save_student = (
  id: string,
  userName: string,
  description: string,
  className: string,
  professor: string,
  maxGroupSize: number,
  department: string,
  phoneNumber: number,
  discord: string
) => {
  set(ref(database, `groups/${department}/students/${id}`), {
    id,
    userName,
    description,
    className,
    professor,
    maxGroupSize,
    department,
    phoneNumber,
    discord,
  });
};

export const get_students = (department: string) => {
  const users = ref(database, `groups/${department}/students/`);
  return users; // User Reference
};

export const get_student = (uid: string) => {
  const studentRef = ref(database, `users/${uid}`);
  return studentRef;
};

export const save_professor = (professor_name: string, department: string) => {
  set(ref(database, department + "/professors/" + professor_name), {
    id: uuidv4(),
  });
};
