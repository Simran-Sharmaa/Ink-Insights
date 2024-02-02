import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authservice from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Container, Input, Button } from "./index";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const onSubmit = async (data) => {
    try {
      const createdUser = await authservice.createAccount(data);
      if (createdUser) {
        const userData = await authservice.getCurrentUser();
        dispatch(login({userData}));
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
      console.log("register error::", error.message);
    }
  };
  return (
    // <Container>
    //   {error&& <p className="bg-danger text-danger ">{error}</p>}
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //         <Input label="Fullname: " placeholder="Enter your fullname" {...register("fullname",{required:true})}/>
    //         <Input
    //         label="Email Address: "
    //         type="email"
    //         placeholder="name@example.com"
    //         {...register("email", {
    //           required: true,
    //           pattern: {
    //             value: /^\S+@\S+$/i,
    //             message: "Please enter valid email address",
    //           },
    //         })}
    //       ></Input>
    //       <Input
    //         label="Password: "
    //         type="password"
    //         {...register("password", {
    //           required: true,
    //         })}
    //       ></Input>
    //       <Button type="submit">Sign up</Button>
    //     </form>
    // </Container>
    <Container>
      {error && <p className="bg-danger text-danger ">{error}</p>}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Fullname"
              placeholder="Enter your fullname"
              {...register("fullname", { required: true })}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              {...register("password", { required: true })}
            />
            <Button type="submit">Sign up</Button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Register;
