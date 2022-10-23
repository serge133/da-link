import { useEffect, useState } from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar/Navbar";
import { Class } from "../../Containers/ClassesDisplay/ClassesDisplay";
import { classes } from "../../database/schoolData";
import { AuthWrapper } from "../../useAuth";
import "./ClassPage.css";

type Props = {};

const ClassPage = (props: Props) => {
  // string s
  const { crn, department, search } = useParams();
  const [classData, setClassData] = useState<Class>();

  // Finds the class based on the crn given through the route params, then finds the class and renders the class
  useEffect(() => {
    const c: Class = classes[department].filter((c: Class) => c.crn === crn)[0];
    setClassData(c);
  }, [department, crn, setClassData]); // Gauranteed to not change

  return (
    <AuthWrapper>
      <div className="App">
        <NavigationBar
          goBack={`/app/${department}${search ? "/" + search : ""}`}
        />
        <section className="class-information">
          <h4 className="crn">{classData?.crn}</h4>
          <h4>{classData?.professor}</h4>
          <h6>{classData?.times}</h6>
          <h6>{classData?.type}</h6>
          <h6>{classData?.id}</h6>
          <h6>{classData?.className}</h6>
          <h6>{classData?.section}</h6>
        </section>
        <section className="studygroup-controls">
          <Button variant="dark">Create Studygroup</Button>
          <Button variant="dark">Message All</Button>
          <Button variant="dark">Post Announcement</Button>
        </section>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Study Group 1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              <div className="button-container">
                <Button variant="primary">Join</Button>
                <Button variant="secondary">Message</Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Study Group 2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              <div className="button-container">
                <Button variant="primary">Join</Button>
                <Button variant="secondary">Message</Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Study Group 3</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              <div className="button-container">
                <Button variant="primary">Join</Button>
                <Button variant="secondary">Message</Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </AuthWrapper>
  );
};

export default ClassPage;
