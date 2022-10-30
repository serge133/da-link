import { limitToLast, onValue, query, ref, set } from "firebase/database";
import { createRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import database from "../../database/firebase";
import { Message, StudyGroupType } from "../../database/models";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const EMPTY_STUDYGROUP: StudyGroupType = {
  id: "",
  name: "",
  author: "",
  likes: {},
  dislikes: {},
  workhardVotes: {},
  socializeVotes: {},
  people: {},
  welcomeMessage: "",
};

const MINUTE = 60000;

const MAX_MESSAGES: number = 100;

const ChatroomPage = () => {
  const { crn, department, studygroupID } = useParams();
  const { user } = useAuth();

  const [studygroup, setStudygroup] =
    useState<StudyGroupType>(EMPTY_STUDYGROUP);

  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = createRef<HTMLDivElement>();

  const isOwner = user?.uid === studygroup.author;
  const belongsInStudyGroup = user?.uid ? user.uid in studygroup.people : false;

  // Fetches once
  useEffect(() => {
    const studygroupRef = ref(database, `/studygroups/${crn}/${studygroupID}`);
    const messageRef = query(
      ref(database, `/messages/studygroups/${crn}/${studygroupID}`),
      // MAX_MESSAGES should be stateful to implement loading more messages
      limitToLast(MAX_MESSAGES)
    );

    onValue(studygroupRef, (snapshot) => {
      let data: StudyGroupType = snapshot.val();

      if (data) {
        setStudygroup((prevState) => ({ ...prevState, ...data }));
      }
    });

    onValue(messageRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, []);

  useEffect(() => {
    if (!bottomRef?.current) return;
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSendMessage = (e: Event) => {
    e.preventDefault();
    if (!user) return;
    if (!messageText) return;
    const timestamp = Date.now();
    // const tempId = uuidv4();
    const databaseMessageRef = ref(
      database,
      `/messages/studygroups/${crn}/${studygroupID}/${timestamp}`
    );

    const displayName: string = user?.firstName
      ? `${user.firstName} ${user.lastName}`
      : "Annonymous";

    const newMessage: Message = {
      uid: user?.uid,
      text: messageText,
      timestamp: timestamp,
      displayName,
    };

    set(databaseMessageRef, newMessage);
    setMessageText("");
  };

  const showTimestampAndName = (index: number): boolean => {
    // if (index === 0 && messages.length <= 1) return true;
    // if (index === messages.length - 1) return true;
    if (
      index !== messages.length - 1 &&
      messages[index + 1].uid === messages[index].uid
    )
      return false;
    return true;
  };

  return (
    <AuthWrapper>
      <div className="App studygroup-dashboard">
        <NavigationBar goBack={`/class/${crn}/${department}`} />
        <StudygroupDashboardContainer
          currentPage="chatroom"
          crn={crn}
          studygroupID={studygroupID}
          department={department}
          isOwner={isOwner}
          allowedAccessToPage={belongsInStudyGroup}
        >
          <div className="chatroom">
            <div className="message-area">
              {messages.map((message, i) => (
                <div
                  key={message.timestamp}
                  className={message.uid === user?.uid ? "mine" : "yours"}
                >
                  {/* <span className="text">{message.text}</span> */}
                  <div className="message">{message.text}</div>
                  {showTimestampAndName(i) && (
                    <div className="timestamp">
                      {new Date(message.timestamp).toLocaleString()}{" "}
                      {message.displayName}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <Form className="message-box-container">
              <Form.Control
                type="text"
                id="messageBox"
                placeholder="Message"
                onChange={(e) => setMessageText(e.target.value)}
                value={messageText}
              />
              <Button type="submit" onClick={onSendMessage}>
                Send
              </Button>
            </Form>
          </div>
        </StudygroupDashboardContainer>
      </div>
    </AuthWrapper>
  );
};

export default ChatroomPage;
