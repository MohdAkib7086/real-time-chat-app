import axios from "axios";
export const userRegister = (data) => {
  for (var [key, value] of data.entries()) {
    console.log(key, value);
  }
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    };
    try {
      const response = await axios.post("/api/chat/register", data, config);
      // console.log(response.data);
      localStorage.setItem("authToken", response.data.token);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": `application/json`,
      },
    };
    try {
      const response = await axios.post("/api/chat/login", data, config);
      // console.log(response.data);
      localStorage.setItem("authToken", response.data.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogout = async (dispatch) => {
  try {
    const response = await axios.post("/api/chat/logout");
    if (response.data.success) {
      localStorage.removeItem("authToken");
      dispatch({
        type: "LOGOUT_SUCCESS",
      });
    }
  } catch (error) {}
};

