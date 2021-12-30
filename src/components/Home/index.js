import React, { useState, useRef } from "react";
import withRepo from "../../wrappers/withRepo";

import Pagination from "../Pagination";
import Cards from "../Common/Cards";
import Search from "../Common/Search";
import { GithubIcon } from "../Common/Icons";

const Home = ({ service, file: fileService }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState(null);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const readmeRef = useRef(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data } = await service.getAllRepositories({
        search,
        page,
        per_page: perPage,
        sort: sort,
      });
      console.log(data);
      setItems(data.items);
      setTotal(data.total);
      setPage(1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getReadMeDoc = async ({ author, repo, branch }) => {
    console.log(author, repo, branch);
    const doc = await fileService.getReadMe({ author, repo, branch });
    readmeRef.current.innerText = doc;
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeSelect = (e) => {
    setSort(e.target.value);
  };

  const handleChangeLimit = (e) => {
    setPerPage(e.target.value);
  };

  const onPageChange = async (n) => {
    setLoading(true);
    try {
      const { data } = await service.getAllRepositories({
        search,
        page: n,
        per_page: perPage,
        sort: sort,
      });
      setItems(data.items);
      setPage(n);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getRepoDetails = async ({ author, repo }) => {
    const { data } = await service.getOneRepository({ author, repo });
    console.log(data);
  };

  return (
    <div>
      <div className="flex justify-center">
        <span className="text-8xl">
          <GithubIcon />
        </span>
      </div>
      <Search
        loading={loading}
        search={search}
        {...{
          handleChangeLimit,
          handleChangeSelect,
          handleInputChange,
          handleSearch,
        }}
      />
      {total > 0 && (
        <p className="text-center text-mute">
          {total.toLocaleString?.()} repositories found.
        </p>
      )}
      <div ref={readmeRef}></div>
      <div className="w-3/4 mx-auto mt-12">
        <div>
          <Cards
            items={items}
            loading={loading}
            getReadMeDoc={getReadMeDoc}
            getRepoDetails={getRepoDetails}
          />
        </div>
        {total && total > 1 ? (
          <Pagination
            totalItems={total}
            initialPage={page}
            onPageChange={onPageChange}
          />
        ) : null}
      </div>
    </div>
  );
};

export default withRepo(Home);
