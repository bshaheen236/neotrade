import axios from "axios";
import { NEWTRADE_URL } from "../Constant/UrlConstant";

const API = NEWTRADE_URL;

const getGoldData = () => {
	return axios.get(`${API}getgold`);
};

const getSilverData = () => {
	return axios.get(`${API}getsilver`);
};

const getGoldPrice = () => {
	return axios.get(`${API}getgoldprice`);
};

const getSilverPrice = () => {
	return axios.get(`${API}getsilverprice`);
};

export { getGoldData, getSilverData, getGoldPrice, getSilverPrice };
