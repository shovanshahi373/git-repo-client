import React from "react";
import { Link } from "react-router-dom";
import { StarIcon, ForkIcon, EyeIcon } from "../Icons";

const index = ({ item, getRepoDetails }) => {
  return (
    <div className="p-4 bg-gray-100 flex justify-between flex-col">
      <div className="flex flex-col space-y-4">
        <div>
          <p
            className="truncate"
            title={`${item.author.name}/${item.repo.name}`}
          >
            {item.author.name}/{item.repo.name}
          </p>
        </div>
        <div className="flex space-x-4">
          <span>
            <StarIcon />
          </span>
          <span>{item.stars.toLocaleString()} stars</span>
        </div>
        <div className="flex space-x-4">
          <span>
            <EyeIcon />
          </span>
          <span>{item.watchers.toLocaleString()} watchers</span>
        </div>
        <div className="flex space-x-4">
          <span>
            <ForkIcon />
          </span>
          <span>{item.forks.toLocaleString()} forks</span>
        </div>
        {item.description?.length && (
          <div>
            <label>description</label>
            <div className="bg-white p-4 my-2 h-32 overflow-hidden overflow-y-auto">
              {item.description}
            </div>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() =>
            getRepoDetails({
              author: item.author.name,
              repo: item.repo.name,
            })
          }
          className="outline-none bg-blue-500 rounded-2xl py-2 px-2 text-white"
        >
          <Link to={`/${item.author.name}/${item.repo.name}`}>View More</Link>
        </button>
      </div>
    </div>
  );
};

export default index;
