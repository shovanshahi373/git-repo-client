import httpClient from "../../https";

class Repository {
  constructor() {
    this.path = "/repositories";
    this.getAllRepositories = this.getAllRepositories.bind(this);
    this.getOneRepository = this.getOneRepository.bind(this);
  }
  async getAllRepositories(params = {}) {
    const { path } = this;
    const { search, page, per_page, sort = "" } = params;
    return httpClient
      .get(`${path}/search`, {
        params: {
          search,
          page,
          per_page,
          sort,
        },
      })
      .then((res) => res.data)
      .then((data) => data);
  }

  async getOneRepository(params = {}) {
    const { path } = this;
    const { author, repo } = params;
    return httpClient
      .get(`${path}/${author}/${repo}`)
      .then((res) => res.data)
      .then((data) => data);
  }
}

export default new Repository();
