import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components";
import RepositoryContext from "./contexts/repository";

ReactDOM.render(
  <React.StrictMode>
    <RepositoryContext>
      <App />
    </RepositoryContext>
  </React.StrictMode>,
  document.getElementById("root")
);
