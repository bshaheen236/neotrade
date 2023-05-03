import axios from "axios";
import { PAYMENT_URL } from "../Constant/UrlConstant";

const API = PAYMENT_URL;

const createOrder = (data) => {
	return axios.post(`${API}/order`, data);
};

const createVerify = (data) => {
	return axios.post(`${API}/verify`, data);
};

const getPaymentDetails = (paymentId) => {
	return axios.post(`${API}/paymentdetails`, paymentId);
};

export { createOrder, createVerify, getPaymentDetails };
