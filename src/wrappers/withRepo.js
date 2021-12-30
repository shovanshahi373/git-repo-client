import React from "react";

import { GetContext } from "../contexts/repository";

const withRepo = (Component) => (props) => {
  const context = GetContext();
  return <Component {...props} {...context} />;
};

export default withRepo;
