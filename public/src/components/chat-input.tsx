import styles from "../styles/chat/chat_container.module.css";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useState } from "react";
import { styled } from "@mui/system";

export default function ChatInput(props: { handleSendMessage: any }) {
  const { handleSendMessage } = props;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event: any) => {
    let message = msg;
    message += event.emoji;
    setMsg(message);
  };

  const sendChat = (event: any) => {
    event.preventDefault();
    if (msg === "") return;
    handleSendMessage(msg);
    setMsg("");
  };

  return (
    <div className={styles.input_container}>
      <EmojiContainer className={styles.button_container}>
        <BsEmojiSmileFill
          color="#ffff00c8"
          fontSize="2rem"
          onClick={handleEmojiPickerHideShow}
        />
        <EmojiHandler>
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </EmojiHandler>
      </EmojiContainer>
      <form className={styles.input_text_container} onSubmit={sendChat}>
        <input
          type="text"
          placeholder="type your message here"
          className={styles.input}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className={styles.input_button_container} type="submit">
          <IoMdSend fontSize="2rem" color="white" />
        </button>
      </form>
    </div>
  );
}
const EmojiContainer = styled("div")`
  cursor: pointer;
  position: relative;
  height: 100px;
`;
const EmojiHandler = styled("div")`
  position: absolute;
  top: -450px;
  left: 0;
  width: 300px !important;
  & .EmojiPickerReact {
    background-color: #080420;
    box-shadow: 0 5px 10px #9186f3;
    border-color: #9186f3;
  }
`;
