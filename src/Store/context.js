import React, { createContext, useState } from "react";
import axios from "axios";
export const Context = createContext({
  accessToken: null,
  notesSituation: false,
});

function ContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState();

  const [notesSituation, setNoteSituation] = useState(false);

  function changeNoteSituation() {
    setNoteSituation(notesSituation === false ? true : false);
  }

  const value = {
    accessToken: accessToken,
    notesSituation: notesSituation,
    changeNoteSituation: changeNoteSituation,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ContextProvider;
