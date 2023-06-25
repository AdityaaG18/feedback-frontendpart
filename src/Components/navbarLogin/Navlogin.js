import React, { useState } from "react";
import style from "./Navlogin.module.css";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navlogin = (props) => {
  const navigate = useNavigate();
  function navsignin() {
    navigate("/Signup");
  }

  const [Login, setLogin] = useState({
    email: "",
    password: "",
  });

  function LoginEmailChange(event) {
    setLogin({ ...Login, email: event.target.value });
  }

  function LoginPasswordChange(event) {
    setLogin({ ...Login, password: event.target.value });
  }

  const Loginsubmit = async (e) => {
    if (Login.email === "" || Login.password === "") {
      toast.error("please fill all the feilds", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Login.email)) {
      toast.error("Please enter a valid email address: xyz@gmail.com", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      const response = await LoginApi({
        email: Login.email,
        password: Login.password,
      });

      if (response) {
        toast.success("login successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
        props.pullRedirect(true);
      }
    } catch (error) {
      toast.error("Login Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className={style.mainbackground}>
      <ToastContainer />
      <div className={style.maincard}>
        <div>
          <div className={style.feedbackstext}>Feedback</div>
          <div className={style.feedbacksitem}>
            Add your products and give us your valuable feedback
          </div>
        </div>
        <div class="card rounded " style={{ width: "35rem" }}>
          <div class="card-body">
            <div className="d-flex flex-column bd-highlight">
              <div className="p-2 bd-highlight mt-3 ms-5">
                {" "}
                <span>
                  {" "}
                  <img src={require("../Images/email.png")} alt="Logo" />
                </span>{" "}
                <span>
                  <input
                    type="email"
                    placeholder="Email"
                    className={style.inputs}
                    value={Login.email}
                    onChange={LoginEmailChange}
                  />
                </span>
              </div>
              <div className="p-2 bd-highlight mt-3 ms-5">
                {" "}
                <span>
                  {" "}
                  <img src={require("../Images/password.png")} alt="Logo" />
                </span>{" "}
                <span>
                  <input
                    type="password"
                    placeholder="Password"
                    className={style.inputs}
                    value={Login.password}
                    onChange={LoginPasswordChange}
                  />
                </span>
              </div>
            </div>
            <div class="d-flex bd-highlight mb-3 ms-5 mt-3">
              <div class="p-2 bd-highlight" className={style.textbtn}>
                Don't have an account?
              </div>
              <div class=" bd-highlight">
                <button className={style.loginbtn} onClick={navsignin}>
                  Sign in
                </button>
              </div>
            </div>
            <button className={style.buttonchip2} onClick={Loginsubmit}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navlogin;
