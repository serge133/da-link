import { child, getDatabase, push, ref, set, update } from "firebase/database";
import app from "./firebase";
import { uuidv4 } from "@firebase/util";

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
  const db = getDatabase(app);
  set(ref(db, `${department}/students/${id}`), {
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
  const db = getDatabase(app);
  const users = ref(db, `${department}/students/`);
  return users; // User Reference
};

export const get_student = (department: string, id: string) => {
  const db = getDatabase(app);
  const student = ref(db, `${department}/students/${id}`);
  return student;
};

export const save_professor = (professor_name: string, department: string) => {
  const db = getDatabase(app);
  set(ref(db, department + "/professors/" + professor_name), {
    id: uuidv4(),
  });
};
