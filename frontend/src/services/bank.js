import axios from "axios";
import { BANK_URL } from "../Constant/UrlConstant";

const API = BANK_URL;

const addBankAccount = (id, data) => {
	return axios.post(`${API}/addbank/${id}`, data);
};

const getBankAccounts = (id) => {
	return axios.get(`${API}/getbankdetails/${id}`);
};

const removeBankAccount = (id, accId) => {
	return axios.get(`${API}/deletebank/${id}/${accId}`);
};

export { addBankAccount, getBankAccounts, removeBankAccount };
