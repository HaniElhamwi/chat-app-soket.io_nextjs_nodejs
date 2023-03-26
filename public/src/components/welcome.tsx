import robot from "../assets/robot.gif";
import Image from "next/image";
import styles from "../styles/chat/welcome.module.css";

export default function Welcome({ user }: { user: any }) {
  return (
    <div className={styles.container}>
      <Image
        src={robot}
        alt="Robot"
        className={styles.img}
        width={500}
        height={500}
      />
      <h1>
        welcome <span className={styles.user_name}>{user?.username}</span>
      </h1>
      <h3>please select a chat to start messaging</h3>
    </div>
  );
}
