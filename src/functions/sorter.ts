import { Student } from "../database/models";

export const relevancy = (
  arr: Student[],
  // filters, // Object with filters
  userName: string,
  professor: string,
  className: string,
  maxGroupSize: number
) => {
  const checkIfYou = (el: Student) => {
    return el["userName"] !== userName;
  };

  const checkGroupSize = (el: Student) => {
    return el["maxGroupSize"] <= maxGroupSize;
  };

  const checkClassname = (el: Student) => {
    return el["className"] === className;
  };

  const checkProfessor = (el: Student) => {
    return el["professor"] === professor;
  };

  let filteredArr = arr.filter(checkIfYou);

  // if (filters["group"]) {
  //   filteredArr = filteredArr.filter(checkGroupSize);
  // }
  if (className.trim().length > 0) {
    filteredArr = filteredArr.filter(checkClassname);
  }
  if (professor.trim().length > 0) {
    filteredArr = filteredArr.filter(checkProfessor);
  }

  return filteredArr;
};
