import axios from "../config/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config/toastify";

export function setUsernameName(payload) {
  return (dispatch) => {
    dispatch({ type: "USER/SETNAME", payload });
  };
}

export function setUsernameUsername(payload) {
  return (dispatch) => {
    dispatch({ type: "USER/SETUSERNAME", payload });
  };
}

export function setUserSaldo(payload) {
  return (dispatch) => {
    dispatch({ type: "USER/SETSALDO", payload });
  };
}

export function setLoginFalse() {
  return (dispatch) => {
    dispatch({ type: "LOGINSTATUS/LOGOUT" });
    toast("You've logged out");
  };
}

export function setLoginTrue(payload) {
  return (dispatch) => {
    dispatch({ type: "LOGINSTATUS/LOGIN", payload });
  };
}

export function setVouchers(payload) {
  return (dispatch) => {
    dispatch({ type: "USER/SETVOUCHER", payload });
  };
}

export function setListTransaction(payload) {
  return (dispatch) => {
    dispatch({ type: "USER/SETLISTTRANSACTIONS", payload });
  };
}

export function login(payload) {
  const success = () => toast("Login success", config);
  const failed = () => toast.error("Wrong email/password", config);
  const { username, password } = payload;
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "/user/loginUser",
        data: {
          username,
          password,
        },
      });
      success();
      dispatch(setLoginTrue(res.data.access_token));
    } catch (error) {
      console.log(error);
      failed();
    }
  };
}

export function fetchUser() {
  return async (dispatch) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios({
        method: "GET",
        url: "/user",
        headers: {
          access_token,
        },
      });
      const { data } = response;
      dispatch(setUsernameName(data.user.name));
      dispatch(setUserSaldo(data.user.saldo));
      dispatch(setUsernameUsername(data.user.username));
    } catch (error) {
      console.log("error fatch");
    }
  };
}

export function registerUser(payload) {
  const success = () => toast("Register success", config);
  const failed = (err) => toast.error("" + err, config);
  const { name, username, password } = payload;
  return async (dispatch) => {
    try {
      await axios({
        method: "POST",
        url: "/user/createUser",
        data: {
          name,
          username,
          password,
        },
      });
      success();
    } catch (error) {
      let data = error.response.data.message;
      for (let i = 0; i < data.length; i++) {
        failed(data[i]);
      }
    }
  };
}

export function fetchVoucher() {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "/user/voucher",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      const { data } = res;
      dispatch(setVouchers(data));
    } catch (error) {
      console.log("error fecth voucher");
    }
  };
}

export function fetchListTransactions() {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "/user/transaction",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      const { data } = res;
      dispatch(setListTransaction(data.transactions));
    } catch (error) {
      console.log("error fetch list transactions");
    }
  };
}
