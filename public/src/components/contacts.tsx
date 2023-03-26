import { useEffect, useState } from "react";
import styles from "../styles/chat/contact.module.css";

export function Contacts(props: {
  contacts: any;
  currentUser: any;
  handleChangeChat: any;
}) {
  const { contacts, currentUser, handleChangeChat } = props;
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState<number>();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (contact: any, index: number) => {
    setCurrentSelected(index);
    handleChangeChat(contact);
  };

  return (
    <div className={styles.container}>
      {currentUserImage && currentUserName && (
        <div className={styles.second_cont}>
          <div className={styles.brand}>
            <img
              src="https://raw.githubusercontent.com/koolkishan/chat-app-react-nodejs/49409cf75ba2a6e0b3317a1351ab6685a263dc18/public/src/assets/logo.svg"
              alt=""
              className={styles.img}
            />
            <h1 className={styles.title}>Chat App</h1>
          </div>
          <div className={styles.contacts}>
            {contacts.map((contact: any, index: number) => (
              <div
                className={`${styles.contact} ${
                  currentSelected === index ? styles.selected : ""
                }`}
                key={index}
                onClick={() => changeCurrentChat(contact, index)}
              >
                <div className={styles.contactAvatar}>
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                    className={styles.contactImage}
                  />
                </div>
                <div className={styles.username}>
                  <h3 className={styles.username_title}>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.current_user}>
            <div className={styles.avatar}>
              <img
                className={styles.current_user_avatar}
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div>
              <h2 className={styles.current_user_title}>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
