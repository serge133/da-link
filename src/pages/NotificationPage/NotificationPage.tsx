import { getDatabase, onValue, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import NavigationBar from "../../Components/Navbar";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import app from "../../database/firebase";
import {
  JoinStudygroupGroupNotification,
  StudygroupPeopleType,
} from "../../database/models";
import "./NotificationPage.css";
type Props = {};

type Notifications = JoinStudygroupGroupNotification[];

const NotificationPage = (props: Props) => {
  const { user } = useAuth();
  //   const [notifications, setNotifications] = useState<Notifications>([]);

  //   useEffect(() => {
  //     const db = getDatabase(app);
  //     const notificationRef = ref(db, `/users/${user?.uid}/notifications`);
  //     onValue(notificationRef, (snapshot) => {
  //       const data = snapshot.val();
  //       if (data) {
  //         setNotifications(Object.values(data));
  //       }
  //     });
  //   }, [user]);

  //   const removeNotifState = (uid: string) => {
  //     setNotifications((prevState) => prevState.filter((n) => n.uid !== uid));
  //   };

  const onAcceptPerson = (n: JoinStudygroupGroupNotification) => {
    const db = getDatabase(app);
    const notificationRef = ref(
      db,
      `/users/${user?.uid}/notifications/${n.uid}/${n.studygroupID}`
    );
    remove(notificationRef);
    // removeNotifState(n.uid);

    const studygroupPeopleRef = ref(
      db,
      `/studygroups/${n.crn}/${n.studygroupID}/people`
    );
    const studygroupPendingInviteRef = ref(
      db,
      `/studygroups/${n.crn}/${n.studygroupID}/pendingInvites/${n.uid}`
    );

    const newPerson: StudygroupPeopleType = {
      [n.uid]: true,
    };
    update(studygroupPeopleRef, newPerson);
    remove(studygroupPendingInviteRef);
  };

  const onDeclinePerson = (n: JoinStudygroupGroupNotification) => {
    const db = getDatabase(app);
    const notificationRef = ref(
      db,
      `/users/${user?.uid}/notifications/${n.uid}/${n.studygroupID}`
    );
    remove(notificationRef);
    // removeNotifState(n.uid);

    const studygroupPendingInviteRef = ref(
      db,
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
