import { getAllMessages, sendMessage } from "@/utils/apiRoutes";
import axios from "axios";
import styles from "../styles/chat/chat_container.module.css";
import ChatInput from "./chat-input";
import Logout from "./logout";
import { useEffect, useRef, useState } from "react";
import styled from "@mui/system/styled";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({
  chat,
  user,
  socket,
}: {
  chat: any;
  user: any;
  socket: any;
}) {
  const [messages, setMessages] = useState<any>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const scrollRef = useRef<any>();
  useEffect(() => {
    if (chat) {
      const getMessages = async () => {
        const response = await axios.post(`${getAllMessages}`, {
          from: user._id,
          to: chat._id,
        });
        setMessages(response.data);
      };
      getMessages();
    }
  }, [chat]);

  const handleSendMessage = async (msg: string) => {
    socket.current.emit("send-message", {
      from: user._id,
      to: chat._id,
      message: msg,
    });
    const data = await axios.post(`${sendMessage}`, {
      from: user._id,
      to: chat._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  // useEffect(() => {
  // if (socket.current) {
  socket.current.on("msg-receive", (msg: any) => {
    console.log("socket.current", msg);
    setArrivalMessage({ fromSelf: false, message: msg });
  });
  // }
  // }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainerStyled className={styles.chat_container}>
      <div className={styles.chat_header}>
        <div className={styles.chat_details}>
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${chat.avatarImage}`}
              alt="avatar"
              className={styles.chat_img}
            />
          </div>
          <h3 className={styles.chat_name}>{chat?.username}</h3>
        </div>
        <Logout />
      </div>
      <MessagesContainer>
        {messages.map((message: any) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "received"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </MessagesContainer>
      <ChatInput handleSendMessage={handleSendMessage} />
    </ChatContainerStyled>
  );
}

const MessagesContainer = styled("div")`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  & .message {
    display: flex;
    align-items: center;
  }
  & .content {
    max-width: 40%;
    overflow-wrap: break-word;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 1rem;
    color: #d1d1d1;
  }
  .sended {
    justify-content: flex-end;
    & .content {
      background-color: #4f04ff21;
    }
  }
  .received {
    justify-content: flex-start;
    & .content {
      background-color: #9900ff20;
    }
  }
`;

const ChatContainerStyled = styled("div")`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
`;
