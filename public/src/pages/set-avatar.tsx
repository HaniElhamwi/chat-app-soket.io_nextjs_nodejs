import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ToastOptions } from "react-toastify/dist/types";
import loader from "../assets/loader.gif";
import { Buffer } from "buffer";
import styles from "../styles/set-avatar.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { setAvatar } from "@/utils/apiRoutes";

const toastOptions: ToastOptions<{}> = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function SetAvatar({
  avatars: avatarsData,
}: {
  avatars: string[];
}) {
  const [avatars, setAvatars] = useState<string[]>(avatarsData);
  const [loading, isLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(
    undefined
  );
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      router.push("/login");
    }
  }, []);
  const setProfilePicture = async () => {
    if (!selectedAvatar) {
      toast.error("select profile avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-user") || "{}"
      );
      const { data } = await axios.post(`${setAvatar}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        router.push("/");
      } else {
        toast.error("Error setting avatar please try again", toastOptions);
      }
    }
  };

  return (
    <div>
      {loading && (
        <div className="loader">
          <img src={loader} alt="loader" />
        </div>
      )}
      {!loading && (
        <div className={styles.container}>
          <div className="title-container">
            <h1>Pick avatar as you profile picture</h1>
          </div>
          <div className={styles.avatars}>
            {avatars?.map((avatar, index) => {
              return (
                <div
                  className={styles.avatar}
                  style={{
                    border:
                      selectedAvatar === index
                        ? "0.4rem solid #4e04ff"
                        : " solid transparent",
                  }}
                  key={index}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                    className={styles.img}
                  />
                </div>
              );
            })}
          </div>
          <button className={styles.submit_button} onClick={setProfilePicture}>
            {" "}
            set as profile picture
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export async function getServerSideProps() {
  const avatars: any = [];
  const api = "https://api.multiavatar.com/45678945";
  try {
    for (let i = 0; i < 4; i++) {
      const image: any = await axios.get(
        `${api}/${Math.round(Math.random() * 100)}`
      );
      const buffer = Buffer.allocUnsafe(image.data);
      avatars.push(buffer.toString("base64"));
    }
    // avatars(data);
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      avatars,
    }, // will be passed to the page component as props
  };
}
