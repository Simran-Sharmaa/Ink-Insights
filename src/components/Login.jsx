import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authservice from "../appwrite/auth";
import { login as loginStore } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Input } from "./index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const onSubmit = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data);
      if (session) {
        const userData = await authservice.getCurrentUser();
        if (userData) dispatch(loginStore({ userData }));
        navigate("/");
      }else{
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
          });
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
        });
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ transition: "Bounce" }}
      />
      <Container>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email Address: "
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: true,
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter valid email address",
              },
            })}
          ></Input>
          <Input
            label="Password: "
            type="password"
            {...register("password", {
              required: true,
            })}
          ></Input>
          <Button type="submit">Sign in</Button>
      </form> */}
        {error && <p className="bg-danger text-danger ">{error}</p>}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email Address: "
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter valid email address",
                  },
                })}
              ></Input>
              <Input
                label="Password: "
                type="password"
                {...register("password", {
                  required: true,
                })}
              ></Input>
              <Button type="submit">Sign in</Button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Login;
