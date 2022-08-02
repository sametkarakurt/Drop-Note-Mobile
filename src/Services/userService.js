import React, { useContext } from "react";
import axios from "axios";
import { Context } from "../Store/context";

class UserService {
  constructor(token) {
    this.token = token;
  }
  baseURL = "http://localhost:3000";
  postLoginUser = async (data) => {
    const res = await axios.post(`${this.baseURL}/profile/login`, data);
    return res;
  };
  postRegisterUser = (data) => {
    const res = axios.post(`${this.baseURL}/profile/register`, data);
    return res;
  };

  getUser = async (key) => {
    const res = await axios
      .create({
        baseURL: "http://localhost:3000",
        headers: {
          access_token: this.token,
        },
      })
      .get(`/profile/${key}`);

    console.log(res.data);
    return res.data;
  };

  getCurrentUser = async () => {
    const res = await axios
      .create({
        baseURL: "http://localhost:3000",
        headers: {
          access_token: this.token,
        },
      })
      .get("/profile");

    return res.data;
  };

  getUserNotes = async (key) => {
    var res = await axios
      .create({
        baseURL: "http://localhost:3000/profile",
        headers: {
          access_token: this.token,
        },
      })
      .get(`/${key}/notes`);
    return res.data;
  };
}

export default UserService;
