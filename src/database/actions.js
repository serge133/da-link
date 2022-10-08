import { getDatabase, ref, set } from "firebase/database";
import app from "./firebase";

export const save_student = (
  id,
  userName,
  className,
  professor,
  maxGroupSize,
  department
) => {
  const db = getDatabase(app);
  set(ref(db, `${department}/students/${id}`), {
    id,
    userName,
    className,
    professor,
    maxGroupSize,
    department,
  });
};

export const get_students = (department) => {
  const db = getDatabase(app);
  const users = ref(db, `${department}/students/`);
  return users; // User Reference
};

export const get_student = (department, id) => {
  const db = getDatabase(app);
  const student = ref(db, `${department}/students/${id}`);
  return student;
};

export const save_professor = (professor_name, department) => {
  const db = getDatabase(app);
  set(ref(db, department + "/professors"), {
    [professor_name]: {
      id: 38403,
      students: [20203, 408093],
    },
  });
};
