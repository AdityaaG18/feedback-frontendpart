import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function SignupApi(signupData) {
  <ToastContainer />;
  try {
    const reqUrl = "http://localhost:3001/signup";
    const result = await axios.post(reqUrl, signupData);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.error("Error signing up:", error);
    if (error.response.status === 409) {
      toast.error("User already exists.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      toast.error(
        "An error occurred while signing up. Please try again later.",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      return;
    }
  }
}

export async function LoginApi(LoginupData) {
  <ToastContainer />;
  try {
    const reqUrl = "http://localhost:3001/login";
    const result = await axios.post(reqUrl, LoginupData);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    if (error.response.status === 401) {
      toast.error("email and password not matched.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      toast.error("An error occurred while login up. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  }
}

export async function ApplicationApi(applicationData) {
  <ToastContainer />;
  try {
    const reqUrl = "http://localhost:3001/application";
    const result = await axios.post(reqUrl, applicationData);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    toast.error(
      "An error occurred while adding product up. Please try again later.",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return;
  }
}

export async function getApplicationApi() {
  <ToastContainer />;
  try {
    const reqUrl = "http://localhost:3001/application/getApplication";
    const result = await axios.post(reqUrl);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    toast.error(
      "An error occurred while adding product up. Please try again later.",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return;
  }
}

export async function getCategoryApi() {
  <ToastContainer />;
  try {
    const reqUrl = "http://localhost:3001/application/getCategory";
    const result = await axios.post(reqUrl);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    toast.error(
      "An error occurred while fetching Category up. Please try again later.",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return;
  }
}

export async function getCategoryClickedApi(category) {
  <ToastContainer />;
  try {
    const reqUrl = `http://localhost:3001/application/${category}`;
    const result = await axios.post(reqUrl);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    toast.error(
      "An error occurred while fetching Category up. Please try again later..",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return;
  }
}

export async function getcommentsUpdate(id, comment) {
  <ToastContainer />;
  try {
    const reqUrl = `http://localhost:3001/application/${id}/comments`;
    const result = await axios.post(reqUrl, { comment });
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    toast.error(
      "An error occurred while fetching comments up. Please try again later",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return;
  }
}

export async function getupvoteUpdate(id) {
  <ToastContainer />;
  try {
    const reqUrl = `http://localhost:3001/application/${id}/upvote`;
    const result = await axios.post(reqUrl);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    toast.error(
      "An error occurred while fetching upvote up. Please try again later",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return;
  }
}

export async function getupvoteSort() {
  <ToastContainer />;
  try {
    const reqUrl = `http://localhost:3001/application/sortUpvote`;
    const result = await axios.post(reqUrl);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    toast.error(
      "An error occurred while fetching sortupvote up. Please try again later",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return;
  }
}

export async function getcommentSort() {
  <ToastContainer />;
  try {
    const reqUrl = `http://localhost:3001/application/sortComment`;
    const result = await axios.post(reqUrl);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    toast.error(
      "An error occurred while fetching sortcomment up. Please try again later",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return;
  }
}

export async function editapi(id) {
  <ToastContainer />;
  try {
    const reqUrl = `http://localhost:3001/application/${id}/edit`;
    const result = await axios.post(reqUrl);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    toast.error(
      "An error occurred while fetching editApplication up. Please try again later",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return;
  }
}

export async function updateapi(id, updates) {
  <ToastContainer />;
  try {
    const reqUrl = `http://localhost:3001/application/${id}/update`;
    const result = await axios.post(reqUrl, { updates });
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    toast.error(
      "An error occurred while fetching editApplication up. Please try again later",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return;
  }
}
