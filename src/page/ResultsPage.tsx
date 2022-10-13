import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Student } from "../database/models";

interface Props {
  results?: Student[];
}

export default (props: Props) => {
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
  const handleMessage = (user: Student) => {
    console.log(user);
    alert(
      `Phone Number: ${user["phoneNumber"]} | Discord Link: ${user["discord"]} `
    );
  };

  return (
    <div className="student-carousel">
      {props.results?.map((u) => (
        <Card
          style={{ width: "18rem", height: 300, textAlign: "left" }}
          key={u["id"]}
        >
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>{u["userName"]}</Card.Title>
            <Card.Subtitle style={{ marginBottom: 5 }}>
              {u["className"]} |{" "}
              <span style={{ color: "#171717", fontWeight: 200 }}>
                {u["professor"]}
              </span>
            </Card.Subtitle>
            <Card.Text>{u["description"]}</Card.Text>
          </Card.Body>
          <div className="button-container">
            <Button onClick={() => handleMessage(u)} variant="primary">
              Message
            </Button>
            <Button variant="secondary">Enroll</Button>
          </div>
          <Card.Footer>
            {u["maxGroupSize"]} {u["maxGroupSize"] > 1 ? "People" : "Person"}
          </Card.Footer>
        </Card>
      ))}
      {/* <button onClick={onGetStudent}>Get MB student</button> */}
    </div>
  );
};
