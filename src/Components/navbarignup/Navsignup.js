import React, { useState } from "react";
import style from "./Navsignup.module.css";
import { useNavigate } from "react-router-dom";
import { SignupApi } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navsignup = (props) => {
  const navigate = useNavigate();

  function navloginclicked() {
    navigate("/login");
  }

  const [signup, setsignup] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  function signupNameChange(e) {
    setsignup({ ...signup, name: e.target.value });
  }

  function signupEmailChange(event) {
    setsignup({ ...signup, email: event.target.value });
  }

  function signupMobileChange(event) {
    setsignup({ ...signup, mobile: event.target.value });
  }

  function signupPasswordChange(event) {
    setsignup({ ...signup, password: event.target.value });
  }

  const signupSubmit = async (e) => {
    if (
      signup.name === "" ||
      signup.email === "" ||
      signup.mobile === "" ||
      signup.password === ""
    ) {
      toast.error("please fill all the feilds", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Validate email field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signup.email)) {
      toast.error("Please enter a valid email address: xyz@gmail.com", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Validate mobile field
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(signup.mobile)) {
      toast.error("Please enter  10 digit mobile number.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      const response = await SignupApi({
        name: signup.name,
        email: signup.email,
        mobile: signup.mobile,
        password: signup.password,
      });

      if (response) {
        // console.log("Signup successful:", response);
        toast.success("Signup successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
        props.pullRedirect(true);
      }
    } catch (error) {
      toast.error("Signup Failed", {
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
                <span>
                  <img
                    src={require("../Images/user.png")}
                    alt="Logo"
                    style={{ height: "27px", width: "27px" }}
                  />
                </span>{" "}
                <span>
                  <input
                    type="text"
                    placeholder="Name"
                    className={style.inputs}
                    value={signup.name}
                    onChange={signupNameChange}
                    required
                  />
                </span>
              </div>
              <div className="p-2 bd-highlight mt-3 ms-5">
                {" "}
                <span>
                  {" "}
                  <img src={require("../Images/email.png")} alt="Logo" />
                </span>{" "}
                <span>
                  <input
                    placeholder="Email"
                    className={style.inputs}
                    type="email"
                    value={signup.email}
                    onChange={signupEmailChange}
                  />
                </span>
              </div>
              <div className="p-2 bd-highlight mt-3 ms-5">
                {" "}
                <span>
                  {" "}
                  <img src={require("../Images/mobile.png")} alt="Logo" />
                </span>{" "}
                <span>
                  <input
                    placeholder="Mobile"
                    className={style.inputs}
                    type="tel"
                    value={signup.mobile}
                    onChange={signupMobileChange}
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
                    placeholder="Password"
                    className={style.inputs}
                    type="password"
                    value={signup.password}
                    onChange={signupPasswordChange}
                  />
                </span>
              </div>
            </div>
            <div class="d-flex bd-highlight mb-3 ms-5 mt-3">
              <div class="p-2 bd-highlight" className={style.textbtn}>
                Already have an account?
              </div>
              <div class=" bd-highlight">
                <button className={style.loginbtn} onClick={navloginclicked}>
                  Log in
                </button>
              </div>
            </div>
            <button className={style.buttonchip2} onClick={signupSubmit}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navsignup;
