import React, { useState, useEffect } from "react";
import style from "./Editproduct.module.css";
import { updateapi } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editproduct = (props) => {
  const [editproducts, seteditproducts] = useState({
    companyName: "",
    category: "",
    logo: "",
    link: "",
    Description: "",
    id: "",
  });

  const updateClick = async (id) => {
    if (
      editproducts.companyName === "" ||
      editproducts.category === "" ||
      editproducts.logo === "" ||
      editproducts.link === "" ||
      editproducts.Description === ""
    ) {
      toast.error("please fill all the feilds", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      const data = await updateapi(id, editproducts);
      if (data) {
        toast.success("application updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Error updating application : try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    seteditproducts({
      companyName: props.pusheditproduct?.companyName,
      category: props.pusheditproduct?.category,
      logo: props.pusheditproduct?.logo,
      link: props.pusheditproduct?.link,
      Description: props.pusheditproduct?.Description,
      id: props.pusheditproduct?._id,
    });
  }, [props.pusheditproduct]);

  useEffect(() => {}, []);

  return (
    <div>
      <ToastContainer />
      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div class="row">
              <div class="col-6">
                <div className={style.header}>
                  <h3>Add your product </h3>
                </div>
                <div className="d-flex flex-column bd-highlight">
                  <div className="p-2 bd-highlight mt-4 ms-4">
                    <span>
                      <input
                        type="text"
                        placeholder="Name of the company"
                        className={style.inputs}
                        value={editproducts.companyName}
                        onChange={(e) =>
                          seteditproducts({
                            ...editproducts,
                            companyName: e.target.value,
                          })
                        }
                      />
                    </span>
                  </div>
                  <div className="p-2 bd-highlight mt-4 ms-4">
                    <span>
                      <input
                        type="text"
                        placeholder="Category"
                        className={style.inputs}
                        value={editproducts.category}
                        onChange={(e) =>
                          seteditproducts({
                            ...editproducts,
                            category: e.target.value,
                          })
                        }
                      />
                    </span>
                  </div>
                  <div className="p-2 bd-highlight mt-4 ms-4">
                    <span>
                      <input
                        type="text"
                        placeholder="Add logo url"
                        className={style.inputs}
                        value={editproducts.logo}
                        onChange={(e) =>
                          seteditproducts({
                            ...editproducts,
                            logo: e.target.value,
                          })
                        }
                      />
                    </span>
                  </div>
                  <div className="p-2 bd-highlight mt-4 ms-4">
                    <span>
                      <input
                        type="text"
                        placeholder="Link of product"
                        className={style.inputs}
                        value={editproducts.link}
                        onChange={(e) =>
                          seteditproducts({
                            ...editproducts,
                            link: e.target.value,
                          })
                        }
                      />
                    </span>
                  </div>
                  <div className="p-2 bd-highlight mt-4 ms-4">
                    <span>
                      <input
                        type="text"
                        placeholder="Add description"
                        className={style.inputs}
                        value={editproducts.Description}
                        onChange={(e) =>
                          seteditproducts({
                            ...editproducts,
                            Description: e.target.value,
                          })
                        }
                      />
                    </span>
                  </div>
                </div>
                <button
                  className={style.buttonchip2}
                  data-bs-dismiss="modal"
                  onClick={() => updateClick(editproducts.id)}
                >
                  +Update
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

export default Editproduct;
