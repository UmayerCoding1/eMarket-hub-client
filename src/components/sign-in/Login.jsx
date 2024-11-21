import React, { useEffect, useRef, useState } from "react";
import { logo } from "../../provider/ImageProvider";
import { Button, duration, TextField } from "@mui/material";
import { EyeOff, EyeOn } from "../../provider/IconProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../shared/Social-login/SocialLogin";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Error from "../../shared/toasts/Error";
import { Helmet } from "react-helmet";


const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { signInUser } = useAuth();
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const navigateForm = location?.state?.form || '/';

  useEffect(() => {
    emailRef.current.focus();
  },[])

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email,password)
    .then(result => {
      console.log(result.user);
      toast.success('You are sign in successfully',{ duration:1000});
      navigate(navigateForm)
    })
    .catch(error => {
      toast.custom(
        (t) => (
          <div className="flex items-center">
            <Error id={t.id}>{error.code}</Error>
          </div>
        ),
        { duration: 1000 }
      );
    })
  
    
  };
  return (
    <div>
      <Helmet><title>Sign in...</title></Helmet>
      <div className="w-full h-full bg-[#0000009c] absolute top-0 flex items-center justify-center">
        <div className="w-96 rounded-lg bg-white p-4">
          <div className="flex items-center justify-center ">
            <img className="w-20" src={logo} alt="" />
          </div>

          <form onSubmit={handleSignIn} className="mt-5">
            <h2 className="text-2xl font-semibold">Sign In</h2>

            <div className="mt-5">
              <TextField
                style={{ width: "100%" }}
                name="email"
                type="email"
                label="Email*"
                inputRef={emailRef}
              />
            </div>

            <div className="mt-5 relative ">
              <TextField
                style={{ width: "100%" }}
                name="password"
                type={showPass ? "text" : "password"}
                label="Password*"
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-2 top-1/3"
              >
                {showPass ? <EyeOff /> : <EyeOn />}
              </button>
            </div>
            <p className="underline text-xs text-gray-500 cursor-pointer hover:text-blue-500 text-end">
              Forgot password
            </p>
            <div className="mt-3">
              <Button
                style={{ width: "100%" }}
                type="submit"
                variant="contained"
                size="medium"
              >
                Sign In
              </Button>
            </div>

            <p className="text-gray-500 font-bold text-xs mt-3">
              Don't have an account?{" "}
              <Link to={"/sign-up"}>
                {" "}
                <span className="text-blue-500">Sign up</span>
              </Link>
            </p>

            <SocialLogin />
          </form>

        </div>
        <Toaster
         position="bottom-right"
         reverseOrder={false}
         />
      </div>
       
      
    </div>
  );
};

export default Login;
