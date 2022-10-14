import { Class } from "../Containers/ClassesDisplay/ClassesDisplay";

export const relevancy = (
  arr: Class[],
  // filters, // Object with filters
  search: string
) => {
  const query = (el: Class) => {
    const keyMatch = (
      key: "className" | "professor" | "crn" | "id",
      match: string
    ) => {
      return el[key].toLowerCase().includes(match);
    };

    const searchWords = search.toLowerCase().split(" ");

    let contains: boolean = true;
    for (const word of searchWords) {
      const trimmedWord = word.trim();
      const c1 = keyMatch("className", trimmedWord);
      const c2 = keyMatch("professor", trimmedWord);
      const c3 = keyMatch("crn", trimmedWord);
      const c4 = keyMatch("id", trimmedWord);

      contains = (c1 || c2 || c3 || c4) && contains;
    }
    return contains;
  };

  let filteredArr = arr;

  if (search.trim().length > 0) {
    filteredArr = filteredArr.filter(query);
  }

  return filteredArr;
};
