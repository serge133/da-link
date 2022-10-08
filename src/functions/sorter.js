const relevancy = (
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

  const filtFunc = {
    group: (a) => {
      return a.filter(checkGroupSize);
    },
    class: (a) => {
      return a.filter(checkClassname);
    },
    professor: (a) => {
      return a.filter(checkProfessor);
    },
  };

  for (let filt in ["group", "class", "professor"]) {
    filteredArr = filtFunc[filt](filteredArr);
  }

  return filteredArr;
};
