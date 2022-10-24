import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { StudyGroupType } from "../../pages/Class/ClassPage";

type Props = {
  studygroups: StudyGroupType[];
};

const Studygroups = (props: Props) => {
  return (
    <Accordion defaultActiveKey="0">
      {props.studygroups.map((sg, i) => (
        <Accordion.Item eventKey={i} key={sg.id}>
          <Accordion.Header>{sg.name}</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <div className="button-container">
              <Button variant="primary">Join</Button>
              <Button variant="secondary">Message</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
      {/* <Accordion.Item eventKey="1">
        <Accordion.Header>Study Group 2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
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
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <div className="button-container">
            <Button variant="primary">Join</Button>
            <Button variant="secondary">Message</Button>
          </div>
        </Accordion.Body>
      </Accordion.Item> */}
    </Accordion>
  );
};

export default Studygroups;
