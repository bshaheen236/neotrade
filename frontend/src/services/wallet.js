import axios from "axios";
import { WALLET_URL } from "../Constant/UrlConstant";

const token = localStorage.getItem("token");

const instance = axios.create({
	baseURL: WALLET_URL,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

const depositAmount = (id, amount) => {
	return instance.post(`addamount/${id}`, amount);
};

const viewAmount = (id) => {
	return instance.get(`viewamount/${id}`);
};
// view admin wallet
const viewAdminWallet = () => {
	return instance.get("viewadminwallet");
};

const withdrawAmount = (id, amount) => {
	return instance.post(`withdrawamount/${id}`, amount);
};
const walletTransaction = (id, pageNo, limit, headers) => {
	return axios.get(`${WALLET_URL}transaction?id=${id}&page_no=${pageNo}&page_limit=${limit}`, headers);
};

const walletExport = (pageNo, limit) => {
	return instance.get(`walletexport?page_no=${pageNo}&page_limit=${limit}`);
};
// buy sell wallet update
const buyAmount = (id, amount) => {
	return instance.post(`buyamount/${id}`, amount);
};

const sellAmount = (id, amount) => {
	return instance.post(`sellamount/${id}`, amount);
};
export {
	walletTransaction,
	depositAmount,
	withdrawAmount,
	viewAmount,
	buyAmount,
	sellAmount,
	walletExport,
	viewAdminWallet
};
