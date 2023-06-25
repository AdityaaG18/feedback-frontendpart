import React, { useState } from "react";
import style from "./Login.module.css";
import { LoginApi } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
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
        props.pullRedirect(true);
      }
    } catch (error) {
      toast.error("Login Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className={style.mainBox}>
      <ToastContainer />
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div class="row">
              <div class="col-6">
                <div className={style.header}>
                  <h3 className={style.text2}>Login to continue</h3>
                </div>
                <div className="d-flex flex-column bd-highlight">
                  <div className="p-2 bd-highlight mt-4 ms-5">
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
                  <div className="p-2 bd-highlight mt-4 ms-5">
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
                <button
                  className={style.buttonchip2}
                  data-bs-dismiss="modal"
                  onClick={Loginsubmit}
                >
                  Login
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

export default Login;
