export const relevancy = (
  arr,
  filters, // Object with filters
  userName,
  professor,
  className,
  maxGroupSize
) => {
  const checkIfYou = (el) => {
    return el["userName"] !== userName;
  };

  const checkGroupSize = (el) => {
    return el["maxGroupSize"] <= maxGroupSize;
  };

  const checkClassname = (el) => {
    return el["className"] === className;
  };

  const checkProfessor = (el) => {
    return el["professor"] === professor;
  };

  let filteredArr = arr.filter(checkIfYou);

  if (filters["group"]) {
    filteredArr = filteredArr.filter(checkGroupSize);
  }
  if (filters["class"]) {
    filteredArr = filteredArr.filter(checkClassname);
  }
  if (filters["professor"]) {
    filteredArr = filteredArr.filter(checkProfessor);
  }

  return filteredArr;
};
