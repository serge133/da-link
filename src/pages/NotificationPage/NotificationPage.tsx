import { ref, remove, update } from "firebase/database";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import NavigationBar from "../../Components/Navbar";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import database from "../../database/firebase";
import {
  JoinStudygroupGroupNotification,
  StudygroupPeopleType,
} from "../../database/models";
import "./NotificationPage.css";

const NotificationPage = () => {
  const { user } = useAuth();
  const onAcceptPerson = (n: JoinStudygroupGroupNotification) => {
    const notificationRef = ref(
      database,
      `/users/${user?.uid}/notifications/${n.uid}/${n.studygroupID}`
    );
    remove(notificationRef);
    // removeNotifState(n.uid);

    const studygroupPeopleRef = ref(
      database,
      `/studygroups/${n.crn}/${n.studygroupID}/people`
    );
    const studygroupPendingInviteRef = ref(
      database,
      `/studygroups/${n.crn}/${n.studygroupID}/pendingInvites/${n.uid}`
    );

    const newPerson: StudygroupPeopleType = {
      [n.uid]: true,
    };
    update(studygroupPeopleRef, newPerson);
    remove(studygroupPendingInviteRef);
  };

  const onDeclinePerson = (n: JoinStudygroupGroupNotification) => {
    const notificationRef = ref(
      database,
      `/users/${user?.uid}/notifications/${n.uid}/${n.studygroupID}`
    );
    remove(notificationRef);
    // removeNotifState(n.uid);

    const studygroupPendingInviteRef = ref(
      database,
      `/studygroups/${n.crn}/${n.studygroupID}/pendingInvites/${n.uid}`
    );

    remove(studygroupPendingInviteRef);
  };

  return (
    <AuthWrapper>
      <div className="App notification-page">
        <NavigationBar goBack="/app" />
        <ListGroup className="notification">
          {user?.notifications &&
            user.notifications.map((noti) => (
              <ListGroup.Item key={`${noti.studygroupID}-${noti.uid}`}>
                {noti.message}
                <Button variant="primary" onClick={() => onAcceptPerson(noti)}>
                  Accept
                </Button>
                <Button variant="danger" onClick={() => onDeclinePerson(noti)}>
                  Decline
                </Button>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </AuthWrapper>
  );
};

export default NotificationPage;
