import axios from "axios";
import { TRADE_URL } from "../Constant/UrlConstant";

const API = TRADE_URL;

function getGoldData() {
	return axios.get(`${API}/get-gold-data`);
}

function getSilverData() {
	return axios.get(`${API}/get-silver-data`);
}

function getGoldDataByMonthID(id) {
	return axios.get(`${API}/get-gold-data-by-day/${id}`);
}

function getSilverDataByMonthID(id) {
	return axios.get(`${API}/get-silver-data-by-day/${id}`);
}

export {
	getGoldData,
	getSilverData,
	getGoldDataByMonthID,
	getSilverDataByMonthID,
};
