import axios from "axios";
import { INVOICE_URL } from "../Constant/UrlConstant";

const token = localStorage.getItem("token");

const instance = axios.create({
	baseURL: INVOICE_URL,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

// Holding data
function sendBuyInvoice(data) {
	return instance.post("sendbuyinvoice", data);
}
function sendSellInvoice(data) {
	return instance.post("sendsellinvoice", data);
}
function getUsersInvoices(page, limit) {
	return instance.get(`getusersinvoices?page=${page}&limit=${limit}`);
}

export { sendBuyInvoice, getUsersInvoices, sendSellInvoice };
