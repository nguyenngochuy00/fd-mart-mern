import axios from "axios";

const instance = axios.create({
    baseURL: "https://fd-mart.herokuapp.com/",
});

export default instance;