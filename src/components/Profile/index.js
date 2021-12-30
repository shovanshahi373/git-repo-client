import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import withRepo from "../../wrappers/withRepo";

import {
  LoadingIcon,
  IssueIcon,
  BranchIcon,
  RepositoryIcon,
} from "../Common/Icons";

const Profile = ({ service, file }) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const { author, repo } = useParams();

  const [doc, setDoc] = useState(null);

  const getRepoDetails = () => {
    return service.getOneRepository({ author, repo });
  };

  const getReadMeDoc = async (branch) => {
    return file.getReadMe({ author, repo, branch });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await getRepoDetails();
        const branch = data?.default_branch;
        setDetails(data);
        const doc = await getReadMeDoc(branch);
        setDoc(doc);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="h-screen flex justify-center w-2/4 m-16 mx-auto flex-col">
      {loading ? (
        <div>
          <span className="animate-spin">
            <LoadingIcon />
          </span>
        </div>
      ) : (
        <>
          <div className="bg-gray-100 p-8 flex flex-col space-y-4 px-16">
            <div className="flex space-x-4 content-center">
              <RepositoryIcon />
              <span>{details.full_name}</span>
            </div>
            <div className="flex space-x-4 content-center">
              <IssueIcon />
              <span>{details.open_issues_count} open issues</span>
            </div>
            <div className="flex space-x-4 content-center">
              <BranchIcon />
              <span>{details.default_branch}</span>
            </div>
          </div>
        </>
      )}

      <section className={`h-screen ${loading ? "opacity-0" : "opacity-100"}`}>
        <div>ReadMe.md</div>
        <div className="h-3/5 overflow-hidden overflow-y-auto p-4">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{doc}</ReactMarkdown>
        </div>
      </section>
    </div>
  );
};

export default withRepo(Profile);
