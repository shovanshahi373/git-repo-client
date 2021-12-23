import httpClient from "../../https";

class RawContent {
  constructor() {
    this.path = "/raw";
    this.getReadMe = this.getReadMe.bind(this);
  }

  async getReadMe(params = {}) {
    const { path } = this;
    console.log(params);
    const { author, repo, branch } = params;
    return httpClient
      .get(`${path}/readme/${author}/${repo}`, {
        params: {
          branch,
        },
      })
      .then((res) => res.data)
      .then((data) => data);
  }
}

export default new RawContent();
