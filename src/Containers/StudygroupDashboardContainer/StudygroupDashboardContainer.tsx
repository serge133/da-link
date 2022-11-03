import { ReactNode } from "react";
import { Spinner } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router";
import useAuth from "../../Contexts/useAuth";
import { StudygroupPeopleType } from "../../database/models";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import "./StudygroupDashboardContainer.css";

type Pages =
  | "welcome"
  | "chatroom"
  | "discord"
  | "taskboard"
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
  allowedAccessToPage: boolean;
};

const StudygroupDashboardContainer = (props: Props) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // ! FUCK up
  const handleNav = (e: any) => {
    // const target = e.target as HTMLDataListElement;
    const page = e.target.id;
    const url = `/studygroups/${props.crn}/${props.department}/${props.studygroupID}/${page}`;
    navigate(url);
  };
  return (
    <>
      <section className="studygroup-dashboard-side-bar">
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
            active={props.currentPage === "taskboard"}
            id="taskboard"
            onClick={handleNav}
          >
            Taskboard
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
      <section className="studygroup-dashboard_main">
        {props.isOwner || props.allowedAccessToPage ? (
          props.children
        ) : (
          <>
            <Spinner animation="grow" />
            <p className="loading-text">
              If you are seeing this for more than 5 seconds you do not belong
              in this studygroup
            </p>
          </>
        )}
      </section>
    </>
  );
};

export default StudygroupDashboardContainer;
