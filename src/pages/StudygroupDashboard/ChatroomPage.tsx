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
  // Fetches once
  useEffect(() => {
    const studygroupRef = ref(database, `/studygroups/${crn}/${studygroupID}`);
    const messageRef = query(
      ref(database, `/messages/${crn}/${studygroupID}`),
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
    // const tempId = uuidv4();
    const databaseMessageRef = ref(
      database,
      `/messages/${crn}/${studygroupID}`
    );

    const newMessage: Message = {
      uid: user?.uid,
      displayName: "Michael B",
      text: messageText,
      timestamp: Date.now(),
    };

    set(databaseMessageRef, [...messages, newMessage]);
    setMessageText("");
    // setMessages((prevState) => [...prevState, newMessage]);
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
        >
          <div className="chatroom">
            <div className="message-area">
              {messages.map((message) => (
                <div
                  key={Math.random()}
                  className={
                    message.uid === user?.uid
                      ? "message-you"
                      : "message-not-you"
                  }
                >
                  <span className="text">{message.text}</span>
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
