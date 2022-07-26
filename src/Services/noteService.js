import React, { useContext } from "react";
import axios from "axios";
import { Context } from "../Store/context";
class NoteService {
  constructor(token) {
    this.token = token;
  }
  context = useContext(Context);

  fetchNote = async (key) => {
    var res = await axios
      .create({
        baseURL: "http://localhost:3000/notes",
        headers: {
          access_token: this.token,
        },
      })
      .get(`/${key}`);
    return res.data;
  };

  postNote = (data, key) => {
    axios
      .create({
        baseURL: "http://localhost:3000/notes",
        headers: {
          access_token: this.token,
        },
      })
      .post(`/${key}`, data);
  };
}

export default NoteService;
