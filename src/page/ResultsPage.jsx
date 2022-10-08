import { relevancy } from "../functions/sorter";

export default (props) => {
  // useEffect(() => {
  //   // const db = getDatabase(app);
  //   // const results = ref(db, "PHYS/users/");
  //   const users = get_students("PHYS");
  //   onValue(users, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const res = Object.values(data);
  //       setResults(res);
  //       console.log(data);
  //     }
  //   });
  // }, []);

  // const onGetStudent = () => {
  //   const student = get_student("PHYS", "bullshi");
  //   onValue(student, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //     if (data) {
  //       console.log(data);
  //     }
  //   });
  // };
  console.log(props.results);
  return (
    <div>
      {props.results?.map((u) => (
        <div key={u["id"]}>{u["userName"]}</div>
      ))}
      {/* <button onClick={onGetStudent}>Get MB student</button> */}
    </div>
  );
};
