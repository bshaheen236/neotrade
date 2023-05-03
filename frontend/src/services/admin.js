import axios from "axios";

const { ADMIN_URL } = require("../Constant/UrlConstant");

const token = localStorage.getItem("token");

const instance = axios.create({
	baseURL: ADMIN_URL,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

const authorizeUser = (id, status) => {
	return instance.put(`authorizeuser?id=${id}&status=${status}`);
};
const changePassword = (id,data) => {
	return instance.put(`changepassword/${id}`, data);	
};
const newUser = (data) => {
	return instance.post("newuser", data);
};
// eslint-disable-next-line import/prefer-default-export
export { authorizeUser, changePassword, newUser };
