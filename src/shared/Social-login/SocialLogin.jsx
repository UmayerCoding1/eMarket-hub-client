import React from "react";
import { google } from "../../provider/ImageProvider";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const navigateForm = location?.state?.form || "/";

  const handleSignInByGoogle = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result?.user?.email,
        name: result?.user?.displayName,
        method: google,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate(navigateForm);
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-7">
      <p className="text-xs">Or,log in with </p>

      <div className="flex items-center mt-5">
        <button
          onClick={handleSignInByGoogle}
          type="button"
          className="flex items-center text-xs text-gray-500  px-2"
        >
          <img className="w-8 pr-1" src={google} />
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
