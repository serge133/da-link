import { MouseEventHandler, ReactNode, useCallback } from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router";

type Pages =
  | "welcome"
  | "chatroom"
  | "discord"
  | "calendar"
  | "people"
  | "settings"
  | "none";

type Props = {
  children: ReactNode;
  currentPage: Pages;
  crn?: string;
  studygroupID?: string;
  department?: string;
  isOwner: boolean;
};

const StudygroupDashboardContainer = (props: Props) => {
  const navigate = useNavigate();

  // ! FUCK up
  const handleNav = (e: any) => {
    // const target = e.target as HTMLDataListElement;
    const page = e.target.id;
    const url = `/studygroups/${props.crn}/${props.department}/${props.studygroupID}/${page}`;
    navigate(url);
  };
  return (
    <>
      <section className="side-bar">
        <ListGroup as="ul">
          <ListGroup.Item
            as="li"
            active={props.currentPage === "welcome"}
            id="welcome"
            onClick={handleNav}
          >
            Welcome
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            active={props.currentPage === "chatroom"}
            id="chatroom"
            onClick={handleNav}
          >
            Chatroom
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            active={props.currentPage === "discord"}
            id="discord"
            onClick={handleNav}
          >
            Discord
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            active={props.currentPage === "calendar"}
            id="calendar"
            onClick={handleNav}
          >
            Calendar
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            active={props.currentPage === "people"}
            id="people"
            onClick={handleNav}
          >
            People
          </ListGroup.Item>
          {props.isOwner && (
            <ListGroup.Item
              as="li"
              active={props.currentPage === "settings"}
              id="settings"
              onClick={handleNav}
            >
              Settings (owner)
            </ListGroup.Item>
          )}
        </ListGroup>
      </section>
      <section className="main">{props.children}</section>
    </>
  );
};

export default StudygroupDashboardContainer;