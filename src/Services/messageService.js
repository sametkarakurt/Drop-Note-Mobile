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
        baseURL: "",
        headers: {
          access_token: this.token,
        },
      })
      .get("/messages", data);
    console.log(res.data);
    return res.data;
  };
}

export default MessageService;
