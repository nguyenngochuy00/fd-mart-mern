import axios from "axios";

const instance = axios.create({
    // baseURL: "https://fd-mart.herokuapp.com/",
    baseURL: "http://localhost:5000",

});

export default instance;