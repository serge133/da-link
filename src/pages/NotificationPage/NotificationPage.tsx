import { ref, remove, update } from "firebase/database";
import Alert from "react-bootstrap/Alert";
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
        {user?.notifications &&
          user.notifications.map((noti) => (
            <div className="notification-container">
              <Alert
                className="notification"
                key={`${noti.studygroupID}-${noti.uid}`}
                variant="primary"
              >
                {noti.message}
                <Button variant="link" onClick={() => onAcceptPerson(noti)}>
                  Accept
                </Button>
                <Button variant="link" onClick={() => onDeclinePerson(noti)}>
                  Decline
                </Button>
              </Alert>
            </div>
          ))}
      </div>
    </AuthWrapper>
  );
};

export default NotificationPage;
