import { ref, remove, update } from "firebase/database";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import NavigationBar from "../../Components/Navbar";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import database from "../../database/firebase";
import {
  JoinStudygroupGroupNotification,
  StudygroupPerson,
} from "../../database/models";
import "./NotificationPage.css";

const NotificationPage = () => {
  const { user } = useAuth();
  const onAcceptPerson = (n: JoinStudygroupGroupNotification) => {
    const notificationRef = ref(
      database,
      `/users/${user.uid}/notifications/${n.uid}/${n.studygroupID}`
    );
    remove(notificationRef);
    // removeNotifState(n.uid);

    const inviteRef = ref(
      database,
      `/studygroups/${n.crn}/${n.studygroupID}/people/${n.uid}`
    );
    const studygroupPendingInviteRef = ref(
      database,
      `/studygroups/${n.crn}/${n.studygroupID}/pendingInvites/${n.uid}`
    );

    const newPerson: StudygroupPerson = {
      uid: n.uid,
      displayName: n.displayName,
    };
    update(inviteRef, newPerson);
    remove(studygroupPendingInviteRef);
  };

  const onDeclinePerson = (n: JoinStudygroupGroupNotification) => {
    const notificationRef = ref(
      database,
      `/users/${user.uid}/notifications/${n.uid}/${n.studygroupID}`
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
        <NavigationBar />
        {user.notifications.length > 0 ? (
          user.notifications.map((noti) => (
            <div
              className="notification-container"
              key={`${noti.studygroupID}-${noti.uid}`}
            >
              <Alert className="notification" variant="primary">
                {noti.message}
                <Button variant="link" onClick={() => onAcceptPerson(noti)}>
                  Accept
                </Button>
                <Button variant="link" onClick={() => onDeclinePerson(noti)}>
                  Decline
                </Button>
              </Alert>
            </div>
          ))
        ) : (
          <h1
            style={{ marginTop: 10, color: "lightgrey", fontFamily: "serif" }}
          >
            You have 0 Notifications
          </h1>
        )}
      </div>
    </AuthWrapper>
  );
};

export default NotificationPage;
