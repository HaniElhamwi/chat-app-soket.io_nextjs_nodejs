import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { FormEvent } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOptions } from "react-toastify/dist/types";
import axios, { AxiosResponse } from "axios";
import { registerRoute } from "@/utils/apiRoutes";
import { useRouter } from "next/router";

const toastOptions: ToastOptions<{}> = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      router.push("/");
    }
  }, []);
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password does not match", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("username must be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("password must be greater than 8 characters", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleValidation()) {
      const { data }: any = await axios.post(registerRoute, {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        router.push("/");
      }
      if (!data.status) {
        toast.error("there is a problem", toastOptions);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
        >
          <div className="brand">
            <img
              src="https://raw.githubusercontent.com/koolkishan/chat-app-react-nodejs/49409cf75ba2a6e0b3317a1351ab6685a263dc18/public/src/assets/logo.svg"
              alt=""
            />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">create user</button>
          <span>
            already have an account ? <Link href="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    max-width: 38rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0ff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0 !important;
      color: white;
      fond-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: uppercase;
      padding: 1rem 2rem;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
