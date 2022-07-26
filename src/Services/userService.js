import React, { useContext } from "react";
import axios from "axios";
import { Context } from "../Store/context";

class UserService {
  baseURL = "http://localhost:3000";
  postLoginUser = async (data) => {
    const res = await axios.post(`${this.baseURL}/profile/login`, data);
    return res;
  };
  postRegisterUser = (data) => {
    const res = axios.post(`${this.baseURL}/profile/register`, data);
    return res;
  };
}

export default UserService;
