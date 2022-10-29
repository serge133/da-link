import { onValue, ref, serverTimestamp } from "firebase/database";
import { createRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import NavigationBar from "../../Components/Navbar";
import StudygroupDashboardContainer from "../../Containers/StudygroupDashboardContainer/StudygroupDashboardContainer";
import useAuth, { AuthWrapper } from "../../Contexts/useAuth";
import database from "../../database/firebase";
import { StudyGroupType } from "../../database/models";
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

// Display name is {firstName} {lastName}
type Message = {
  timestamp: number; // Unix TIMESTAMP
  text: string;
  displayName: string;
  uid: string;
};

const testMessages: Message[] = [
  {
    timestamp: 1667083248593,
    text: "Hello There",
    uid: "0",
    displayName: "Michael B",
  },
  {
    timestamp: 1667083249999,
    text: "My Name is Michael",
    uid: "0",
    displayName: "Michael B",
  },
  {
    timestamp: 166778882,
    text: "Hi There",
    uid: "1",
    displayName: "Alessia C",
  },
  {
    timestamp: 16673239992,
    text: "How are You?",
    uid: "0",
    displayName: "Michael B",
  },
  {
    timestamp: 16093248593,
    text: "I'm good, wbu?",
    uid: "1",
    displayName: "Alessia C",
  },
  {
    timestamp: 1660903248593,
    text: "fine;..",
    uid: "0",
    displayName: "Michael B",
  },
];

const ChatroomPage = () => {
  const { crn, department, studygroupID } = useParams();
  const { user } = useAuth();

  const [studygroup, setStudygroup] =
    useState<StudyGroupType>(EMPTY_STUDYGROUP);
  const [messages, setMessages] = useState<Message[]>(testMessages);
  const messageRef = createRef();
  const bottomRef = useRef();

  const isOwner = user?.uid === studygroup.author;

  // Fetches once
  useEffect(() => {
    const studygroupRef = ref(database, `/studygroups/${crn}/${studygroupID}`);

    onValue(studygroupRef, (snapshot) => {
      const data: StudyGroupType = snapshot.val();

      if (data) {
        setStudygroup((prevState) => ({ ...prevState, ...data }));
      }
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSendMessage = (e: Event) => {
    e.preventDefault();
    const newMessage: Message = {
      uid: "1",
      displayName: "Michael B",
      text: messageRef.current.value,
      timestamp: Math.random(),
    };

    setMessages((prevState) => [...prevState, newMessage]);
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
                    message.uid === "0" ? "message-not-you" : "message-you"
                  }
                >
                  <span className="text">{message.text}</span>
                  {/* {message.text} */}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <Form className="message-box-container">
              <Form.Control
                type="text"
                id="messageBox"
                placeholder="Message"
                ref={messageRef}
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
