import axios from "axios";
import {
  USER_LOGIN,
  LOADING,
  USER_LOGIN_FAILED,
  LOAD_USER,
  FETCH_USER,
} from "./type";
import setAuthToken from "./utils/setAuthToken";

export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  console.log(body);
  try {
    dispatch({ type: LOADING });
    console.log("No token");
    const res = await axios.post(
      "https://vovoca.herokuapp.com/api/admin/login",
      body,
      config
    );
    dispatch({
      type: USER_LOGIN,
      payload: res.data,
    });
    // dispatch({ type: USER_LOGIN_FAILED, payload: null });
    dispatch({ type: LOAD_USER, payload: res.data });
    return true;
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAILED, payload: err?.response.data });
    return false;
  }
};

export const registerUser = async (username, email, password) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  // request Body
  const body = JSON.stringify({ username, email, password });
  try {
    const res = await axios.post(
      "https://vovoca.herokuapp.com/api/admin/register",
      body,
      config
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return err?.response.data;
  }
};

export const getUserDetails = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
    console.log("token");
    const res = await axios.get("https://vovoca.herokuapp.com/api/admin");
    console.log(res);
    dispatch({
      type: FETCH_USER,
      payload: res.data,
    });
  }
};
