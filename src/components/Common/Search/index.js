import React from "react";

import { SORT_BY } from "../../../constants";
import { SearchIcon } from "../../Common/Icons";

const index = ({ loading, search, ...actions }) => {
  return (
    <div className="w-2/4 m-auto">
      <div className="flex justify-between mb-12">
        <div className="flex space-x-4 content-center">
          <label>Sort By:</label>
          <select onChange={actions.handleChangeSelect}>
            <option value={null}>nothing</option>
            {SORT_BY.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-4 content-center">
          <label>Set Limit:</label>
          <select onChange={actions.handleChangeLimit}>
            {[10, 25, 50].map((n) => (
              <option value={n} key={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="border-solid border-2 border-blue-500 flex justify-between border-gray-50 p-2 rounded-2xl">
        <input
          className="outline-white w-full"
          onChange={actions.handleInputChange}
          placeholder="search for repositories..."
          value={search}
        />
        <button
          className="outline-none bg-blue-500 rounded-2xl py-4 px-8 text-white"
          type="button"
          onClick={() => !loading && actions.handleSearch()}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default index;
