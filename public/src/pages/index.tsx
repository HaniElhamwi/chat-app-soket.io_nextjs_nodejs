import ChatContainer from "@/components/chat-container";
import { Contacts } from "@/components/contacts";
import Welcome from "@/components/welcome";
import { allUsersRoute, host } from "@/utils/apiRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/chat/chat.module.css";
import { io } from "socket.io-client";

interface IUser {
  isAvatarImageSet: boolean;
  _id: string;
}

export default function Home() {
  const socket: any = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [currentChat, setCurrentChat] = useState<any>(undefined);
  const router = useRouter();
  useEffect(() => {
    const fetch = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        router.push("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("chat-app-user") as string)
        );
      }
    };
    fetch();
  }, []);
  const handleChangeChat = (chat: any) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetch = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          router.push("/set-avatar");
        }
      }
    };
    fetch();
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <div className={styles.sub_container}>
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          handleChangeChat={handleChangeChat}
        />
        {!currentChat ? (
          <Welcome user={currentUser} />
        ) : (
          <ChatContainer
            chat={currentChat}
            user={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
