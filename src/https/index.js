import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_.SERVER,
});

export default client;
