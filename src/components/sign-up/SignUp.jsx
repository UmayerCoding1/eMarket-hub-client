import React, {useRef, useState } from "react";
import { logo } from "../../provider/ImageProvider";
import {
  Button,
  TextField,
} from "@mui/material";
import { Close, EyeOff, EyeOn } from "../../provider/IconProvider";
import SocialLogin from "../../shared/Social-login/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "./../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Error from "../../shared/toasts/Error";
import { Helmet } from "react-helmet";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const { createUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const nameRef = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: data.fullName,
        })
          .then(() => console.log("your profile update successfully"))
          .catch((err) => console.log(err.code));
        const userInfo = {
          name: data.fullName,
          email: data.email,
          password: data.password,
          add_date: new Date().toISOString(),
        };
        axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
        })
        navigate('/');
        toast.success("user sign up Successfully!", { duration: 1000 });
        Object.setPrototypeOf(userInfo, null);
      })
      .catch((error) => {
        console.log(error);
        
        toast.custom(
          (t) => (
            <div className="flex items-center">
              <Error id={t.id}>{error.code  }</Error>
            </div>
          ),
          { duration: 1000 }
        );
      });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

 

  return (
    <div>
      <Helmet>
        <title>sign up..</title>
      </Helmet>
      <div className="w-full h-full bg-[#0000009c] absolute top-0 flex items-center justify-center">
        <div className="w-96 rounded-lg  bg-white p-4">
          <div className="flex items-center justify-center ">
            <img className="w-20" src={logo} alt="" />
          </div>

          <form onSubmit={handleSignUp} className="mt-5">
            <h2 className="text-2xl font-semibold">Sign Up</h2>
            <div className="flex items-center gap-2">
              <div className="mt-5">
                <TextField
                  style={{ width: "100%" }}
                  type="text"
                  label="Full name*"
                  {...register("fullName", { required: true })}
                  inputRef={nameRef}
                />
              </div>
              <div className="mt-5">
                <TextField
                  style={{ width: "100%" }}
                  type="number"
                  label="Phone*"
                  {...register("phone", { required: true })}
                />
              </div>
            </div>

            <div className="mt-5">
              <TextField
                style={{ width: "100%" }}
                type="email"
                label="Email*"
                {...register("email", { required: true })}
              />
            </div>

            <div className="mt-5 relative ">
              <TextField
                style={{ width: "100%" }}
                type={showPass ? "text" : "password"}
                label="Password*"
                {...register("password", { required: true })}
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-2 top-1/3"
              >
                {showPass ? <EyeOff /> : <EyeOn />}
              </button>
            </div>

            <div className="mt-3">
              <Button
                style={{ width: "100%" }}
                type="submit"
                variant="contained"
                size="medium"
              >
                Sign Up
              </Button>
            </div>

            <p className="text-gray-500 font-bold text-xs mt-3">
              Have an account?{" "}
              <Link to={"/sign-in"}>
                {" "}
                <span className="text-blue-500">Sign In</span>
              </Link>
            </p>

            <SocialLogin />
          </form>
        </div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default React.memo(SignUp);
