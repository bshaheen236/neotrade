import axios from "axios";
import { CONTACT_URL } from "../Constant/UrlConstant";

const API = CONTACT_URL;

const getContact = (data) => {
	return axios.post(`${API}/info`, data);
}

const notification = () => {
	return axios.get(`${API}/notification`)
}

const markAsRead = (data) => {
	return axios.get(`${API}/markasread/${data}`)
}

const getContactInfobyDate = (start, end) => {
	return axios.get(`${API}/getcontactinfobydate?startdate=${start}&enddate=${end}`)
}

export { getContact, notification, markAsRead, getContactInfobyDate };
