import React from "react";
import Card from "../Card";

import { LoadingIcon } from "../Icons";

const index = ({ items, loading, getReadMeDoc, getRepoDetails }) => {
  return (
    <div className="relative">
      <div
        className={`grid grid-cols-3 gap-4 ${
          loading ? "opacity-10" : "opacity-100"
        }`}
      >
        {!!items?.length &&
          items.map((item) => {
            return (
              <Card
                item={item}
                key={item.name}
                getRepoDetails={getRepoDetails}
                getReadMeDoc={getReadMeDoc}
              />
            );
          })}
      </div>
      {loading && (
        <div className="flex top-0 left-0 justify-center content-center absolute h-full w-full pointer-events-none">
          <div className="relative self-center">
            <span className="inline-block animate-spin">
              <LoadingIcon />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
