import React, { useState } from "react";
import style from "./Addproduct.module.css";
import { ApplicationApi, getApplicationApi, getCategoryApi } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addproduct = (props) => {
  const [products, setproducts] = useState({
    companyName: "",
    category: "",
    logo: "",
    link: "",
    Description: "",
  });

  function companyChange(e) {
    setproducts({ ...products, companyName: e.target.value });
  }

  function categoryChange(event) {
    setproducts({ ...products, category: event.target.value });
  }

  function logoChange(event) {
    setproducts({ ...products, logo: event.target.value });
  }

  function linkChange(event) {
    setproducts({ ...products, link: event.target.value });
  }

  function DescriptionChange(event) {
    setproducts({ ...products, Description: event.target.value });
  }

  const addproduct = async (e) => {
    if (
      products.companyName === "" ||
      products.category === "" ||
      products.logo === "" ||
      products.link === "" ||
      products.Description === ""
    ) {
      toast.error("please fill all the feilds", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      const response = await ApplicationApi({
        companyName: products.companyName,
        category: products.category,
        logo: products.logo,
        link: products.link,
        Description: products.Description,
      });

      if (response) {
        toast.success("application added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setproducts({
          companyName: "",
          category: "",
          logo: "",
          link: "",
          Description: "",
        })
        try {
          const data = await getApplicationApi();
          props.pullapplicationData(data);
        } catch (error) {
          toast.error("Error fetching products", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        try {
          const data = await getCategoryApi();
          props.pullCategory(data);
        } catch (error) {
          toast.error("Error fetching products", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    } catch (error) {
      toast.error("product listing  failed : try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        className="modal fade"
        id="exampleModal2"
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
                        value={products.companyName}
                        onChange={companyChange}
                      />
                    </span>
                  </div>
                  <div className="p-2 bd-highlight mt-4 ms-4">
                    <span>
                      <input
                        type="text"
                        placeholder="Category"
                        className={style.inputs}
                        value={products.category}
                        onChange={categoryChange}
                      />
                    </span>
                  </div>
                  <div className="p-2 bd-highlight mt-4 ms-4">
                    <span>
                      <input
                        type="text"
                        placeholder="Add logo url"
                        className={style.inputs}
                        value={products.logo}
                        onChange={logoChange}
                      />
                    </span>
                  </div>
                  <div className="p-2 bd-highlight mt-4 ms-4">
                    <span>
                      <input
                        type="text"
                        placeholder="Link of product"
                        className={style.inputs}
                        value={products.link}
                        onChange={linkChange}
                      />
                    </span>
                  </div>
                  <div className="p-2 bd-highlight mt-4 ms-4">
                    <span>
                      <input
                        type="text"
                        placeholder="Add description"
                        className={style.inputs}
                        value={products.Description}
                        onChange={DescriptionChange}
                      />
                    </span>
                  </div>
                </div>
                <button
                  className={style.buttonchip2}
                  data-bs-dismiss="modal"
                  onClick={addproduct}
                >
                  +Add
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

export default Addproduct;
