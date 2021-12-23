import React, { createContext, useContext } from "react";

import {
  RepositoryService as service,
  RawContentService as rawservice,
} from "../services";

const RepositoryContext = createContext();

const Repository = ({ children }) => {
  return (
    <RepositoryContext.Provider value={{ service, file: rawservice }}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const GetContext = () => useContext(RepositoryContext);

export default Repository;
