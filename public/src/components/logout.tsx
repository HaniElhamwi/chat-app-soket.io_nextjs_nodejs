import { useRouter } from "next/router";
import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
  const router = useRouter();
  const handleClick = async () => {
    localStorage.clear();
    router.push("/login");
  };
  return (
    <button
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        background: "#9a86f3",
        border: "none",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <BiPowerOff style={{ fontSize: "1.5rem", color: "#ebe7ff" }} />
    </button>
  );
}
