import axios from "axios";

const instance = axios.create({
    // baseURL: "https://fd-mart.herokuapp.com/",
    // baseURL: "https://be-fdmart-mern.onrender.com/",
    baseURL: "http://localhost:5000",

});

export default instance;