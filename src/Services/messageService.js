import React, { useContext } from "react";
import axios from "axios";
import { Context } from "../Store/context";
class MessageService {
  constructor(token) {
    this.token = token;
  }
  context = useContext(Context);

  fetchMessage = async (data) => {
    var res = await axios
      .create({
        baseURL: "http://localhost:3000",
        headers: {
          access_token: this.token,
        },
      })
      .get("/messages", data);
    console.log(res.data);
    return res.data;
  };

  deleteMessage = async (data) => {
    try {
      const res = axios
        .create({
          baseURL: "http://localhost:3000",
          headers: {
            access_token: this.token,
          },
        })
        .delete("/messages", data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
}

export default MessageService;
