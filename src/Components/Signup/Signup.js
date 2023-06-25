import React, { useState } from "react";
import style from "./Signup.module.css";
import { SignupApi } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = (props) => {
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
        toast.success("Signup successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        props.pullRedirect(true);
      }
    } catch (error) {
      toast.error("Signup Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div class="row">
              <div class="col-6">
                <div className={style.header}>
                  <h3>Signup to continue</h3>
                </div>
                <div className="d-flex flex-column bd-highlight">
                  <div className="p-2 bd-highlight mt-4 ms-5">
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
                      />
                    </span>
                  </div>
                  <div className="p-2 bd-highlight mt-4 ms-5">
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
                  <div className="p-2 bd-highlight mt-4 ms-5">
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
                  <div className="p-2 bd-highlight mt-4 ms-5">
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
                    <button
                      className={style.loginbtn}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                    >
                      Log in
                    </button>
                  </div>
                </div>

                <button
                  className={style.buttonchip2}
                  data-bs-dismiss="modal"
                  onClick={signupSubmit}
                >
                  Signup
                </button>
              </div>
              <div class="col-6" style={{ background: "#36416A" }}>
                <div className={style.feedbackstext}>Feedback</div>
                <div className={style.feedbacksitem}>
                  Add your <br /> product and <br /> rate other <br />{" "}
                  items.............
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
