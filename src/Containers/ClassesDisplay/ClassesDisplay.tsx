import "./ClassesDisplay.css";
import { classes } from "../../database/schoolData";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { relevancy } from "../../functions/sorter";
import { useNavigate } from "react-router";

type ClassesDisplayProps = {
  department: string;
  search: string;
  toggleMyClass: (crn: string) => void;
  me: { myClasses: { [crn: string]: boolean } };
};

export type Class = {
  crn: string;
  id: string;
  section: string;
  classStatus: string;
  className: string;
  times: string;
  professor: string;
  type: string;
};

const ClassesDisplay = (props: ClassesDisplayProps) => {
  const { department, search } = props;
  const [data, setData] = useState<Class[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (department in classes) {
      const rawdata: Class[] = classes[department];
      const filteredData = relevancy(rawdata, search);
      setData(filteredData);
    }
  }, [department, search, search]);

  const openClass = (c: Class) => {
    const url = `/class/${c.crn}/${department}/${search}`;
    navigate(url);
  };

  const isMyClass = (c: Class) => c.crn in props.me.myClasses;

  return (
    <div className="class-carousel">
      {data.map((c) => (
        <Card
          style={{
            width: "18rem",
            height: 300,
            textAlign: "left",

            border: c.crn in props.me.myClasses ? "2px solid gold" : "",
          }}
          key={c.crn}
        >
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>{c.className}</Card.Title>
            <Card.Subtitle style={{ marginBottom: 5 }}>
              {c.crn} |{"   "}
              <span style={{ color: "#171717", fontWeight: 200 }}>
                {c.professor}
              </span>
            </Card.Subtitle>
            <Card.Text>{c.classStatus}</Card.Text>
          </Card.Body>
          <div className="button-container">
            <Button variant="primary" onClick={() => openClass(c)}>
              Details
            </Button>
            <Button
              variant={isMyClass(c) ? "warning" : "secondary"}
              onClick={() => props.toggleMyClass(c.crn)}
            >
              {isMyClass(c) ? "Joined" : "Join"}
            </Button>
          </div>
          <Card.Footer>20 Students 4 Groups</Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default ClassesDisplay;
