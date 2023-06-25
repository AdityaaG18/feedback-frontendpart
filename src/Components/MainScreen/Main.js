/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Addproduct from "../Addproduct/Addproduct";
import Editproduct from "../Editproduct/Editproduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getApplicationApi,
  getCategoryApi,
  getCategoryClickedApi,
  getcommentsUpdate,
  getupvoteUpdate,
  getupvoteSort,
  getcommentSort,
  editapi,
} from "../api/api";

const Main = (props) => {
  const navigate = useNavigate();
  const [islogin, setislogin] = useState(false || props.pushRedirect);

  const [expanded, setExpanded] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [sortClicked, setsortClicked] = useState("upvote");
  const [editApplication, seteditApplication] = useState();
  const [getApplication, setgetApplication] = useState([]);
  const [getCategoryData, setgetCategoryData] = useState([]);

  const handleSignupClick = (event) => {
    event.preventDefault();
    navigate("/Signup");
  };

  const handleloginupClick = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  function logoutclick() {
    setislogin(false);
  }

  const upvote = async (id) => {
    try {
      const data = await getupvoteUpdate(id);
      if (data) {
        toast.success("upvote succesfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      getApplicationData();
    } catch (error) {
      toast.error("Error updating application : try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleCommentSubmit = async (id) => {
    setCommentText("");
    try {
      const data = await getcommentsUpdate(id, commentText);
      if (data) {
        toast.success("comment added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      getApplicationData();
    } catch (error) {
      toast.error("Error updating application : try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      const data = await getCategoryClickedApi(category);
      setgetApplication(data);
    } catch (error) {
      toast.error("Error updating application : try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleExpandClick = (index) => {
    if (expanded.includes(index)) {
      setExpanded(expanded.filter((i) => i !== index));
    } else {
      setExpanded([...expanded, index]);
    }
  };

  const getApplicationData = async () => {
    try {
      const data = await getApplicationApi();
      setgetApplication(data);
    } catch (error) {
      toast.error("Error updating application : try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getCategory = async () => {
    try {
      const data = await getCategoryApi();
      setgetCategoryData(data);
    } catch (error) {
      toast.error("Error updating application : try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const upvotesort = async (data) => {
    setsortClicked(data);
    try {
      const data = await getupvoteSort();
      setgetApplication(data);
    } catch (error) {
      toast.error("Error updating application : try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const commentsort = async (data) => {
    setsortClicked(data);
    try {
      const data = await getcommentSort();
      setgetApplication(data);
    } catch (error) {
      toast.error("Error updating application : try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const editClicked = async (id) => {
    try {
      const data = await editapi(id);
      seteditApplication(data);
    } catch (error) {
      toast.error("Error updating application : try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    getApplicationData();
    getCategory();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Signup pullRedirect={setislogin} />
      <Login pullRedirect={setislogin} />
      <Addproduct
        pullapplicationData={setgetApplication}
        pullCategory={setgetCategoryData}
      />
      <Editproduct pusheditproduct={editApplication} />

      <nav
        class="navbar navbar-light pb-1 pt-1"
        style={{ backgroundColor: "#36416A" }}
      >
        <div class="container-fluid">
          <div class="navbar-brand text-light">Feedback</div>
          <form className="d-flex ml-3">
            {islogin ? (
              <button className="btn text-light" onClick={logoutclick}>
                Log out
              </button>
            ) : (
              <button
                className="btn text-light"
                style={{ marginRight: "10px" }}
                onClick={handleloginupClick}
              >
                Log in
              </button>
            )}

            {islogin ? (
              <span>
                <button className="btn text-light">
                  Hello!
                  <img
                    src={require("../Images/person.png")}
                    alt="Logo"
                    className={styles.person}
                  />
                </button>
              </span>
            ) : (
              <button
                className="btn btn-outline-light"
                style={{ marginRight: "10px" }}
                onClick={handleSignupClick}
              >
                Sign up
              </button>
            )}
          </form>
        </div>
      </nav>

      <div class="container-fluid">
        <div class="row">
          <div class="col-5">
            <img
              src={require("../Images/Logo.png")}
              class="img-fluid rounded-start mx-auto d-block"
              alt="Logo"
              style={{ maxHeight: "300px", marginLeft: "150px" }}
            />
          </div>
          <div class="col-7">
            <div className={styles.imagetext}>
              <h2>
                Add your products and give <br /> your valuable feedback
              </h2>
              <p class=" mt-4" className={styles.heading}>
                Easily give your feedback in a matter of minutes. Access your{" "}
                <br /> audience on all platforms. Observe result manually in
                real time
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-3 ">
            <div class="card" style={{ backgroundColor: "#36416A" }}>
              <div class="text-start mt-5 ms-4 mb-2">
                <h2 class="text-light">Feedback</h2>
                <h5 class="text-light">Apply Filter</h5>
              </div>
            </div>

            <div class="card mt-3 shadow-lg">
              <div class="card-body">
                {getCategoryData.map((category, index) => (
                  <button
                    key={index}
                    className={styles.buttonchip}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div class="col-9">
            <div class="card">
              <div class="card-body p-0">
                <div class="d-flex bd-highlight mb-0">
                  <div class="p-2 bd-highlight " className={styles.suggest}>
                    {getApplication.length} Suggestion
                  </div>
                  <div class="d-flex align-items-center">
                    <div
                      class="p-2 bd-highlight mr-3"
                      className={styles.sortby}
                    >
                      <span class="nowrap">Sort by:</span>
                    </div>
                    <div class="p-2 bd-highlight" className={styles.upvotes}>
                      <span class="nowrap">
                        {sortClicked}
                        <div class={styles.dropup}>
                          <button class={styles.dropbtn}>^</button>
                          <div class={styles.dropupcontent}>
                            <a onClick={() => upvotesort("Upvotes")}>Upvotes</a>
                            <a onClick={() => commentsort("Comment")}>
                              Comment
                            </a>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div class="ms-auto p-2 bd-highlight">
                    <div
                      className={styles.addbtn}
                      data-bs-toggle="modal"
                      data-bs-target={
                        islogin ? "#exampleModal2" : "#exampleModal"
                      }
                    >
                      <h5 className="ps-4 pt-2"> + Add Products</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="card-container mt-2"
              style={{ height: "550px", overflowY: "scroll" }}
            >
              {getApplication.map((application, index) => (
                <div
                  key={index}
                  class="card mt-2"
                  style={{ backgroundColor: "rgba(54, 65, 106, 0.15)" }}
                >
                  <div class="card-body d-flex align-items-center pb-0 pt-0">
                    <img
                      src={application.logo}
                      class="rounded"
                      alt="..."
                      className={styles.circularimage}
                    />
                    <div class="d-flex flex-column mt-1 ms-3"  >
                    <a href={application.link}  className={styles.bottom}>
                      <h4 style={{ color: "#36416A" }} >
                        {application.companyName}
                      </h4>
                      </a>
                      <h6>{application.Description}</h6>
                      <div class="d-flex flex-row ">
                        {application.category.map((cat, index) => (
                          <button key={index} className={styles.buttonchip2}>
                            {cat}
                          </button>
                        ))}
                        <img
                          src={require("../Images/comment.png")}
                          alt="..."
                          className={styles.comment}
                        />
                        <p className={styles.comment2}>comment</p>
                      </div>
                    </div>
                    <div class="d-flex flex-column ms-auto ">
                      <div
                        className={styles.buttonvertical}
                        onClick={() => upvote(application._id)}
                      >
                        ^<br /> {application.upvote}
                      </div>
                      <div class="d-flex flex-row ms-auto me-2 mb-1">
                        {islogin ? (
                          <button
                            className={styles.buttonchip3}
                            onClick={async () =>
                              await editClicked(application._id)
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal3"
                          >
                            Edit
                          </button>
                        ) : null}
                        <div class="ms-auto ">
                          <span class="me-1">{application.comment.length}</span>
                          <img
                            src={require("../Images/Vector.png")}
                            alt="..."
                            onClick={() => handleExpandClick(index)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {expanded.includes(index) && (
                    <div className={styles.container}>
                      <div className={styles.inputContainer}>
                        <input
                          type="text"
                          placeholder="Add a comment......"
                          value={commentText}
                          className={styles.inputBox}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div className={styles.button}>
                          <img
                            src={require("../Images/arrow.png")}
                            alt="Logo"
                            onClick={() => handleCommentSubmit(application._id)}
                          />
                        </div>
                      </div>
                      <div className={styles.commentsContainer}>
                        {application.comment.map((comments, index) => (
                          <div
                            key={index}
                            className="ms-3 "
                            style={{ display: "flex" }}
                          >
                            <span>
                              {" "}
                              <img
                                src={require("../Images/eclipse.png")}
                                alt="Logo"
                              />
                            </span>{" "}
                            <span className={styles.addcomment}>
                              {comments}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
