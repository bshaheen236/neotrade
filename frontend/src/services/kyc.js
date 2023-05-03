import axios from "axios";
import { KYC_URL } from "../Constant/UrlConstant";

const API = KYC_URL;

const postKyc = (id, data) => {
	console.log("service",data);
	return axios.post(`${API}postkyc/${id}`, data);
};

const getKyc = (id) => {
	return axios.get(`${API}getkyc/${id}`);
};

export { postKyc, getKyc };
