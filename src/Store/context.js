import React, { createContext, useState } from "react";

export const Context = createContext({
  accessToken: "U2FsdGVkX19SVMs1Gw1lIqmA6tBPSjslzK3No3bpNC8=",
  notesSituation: false,
});

function ContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    "U2FsdGVkX19SVMs1Gw1lIqmA6tBPSjslzK3No3bpNC8="
  );

  const [notesSituation, setNoteSituation] = useState(false);

  function changeToken(token) {
    setAccessToken(token);
  }

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
