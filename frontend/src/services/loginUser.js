import axios from "axios";
// import jwtDecode from "jwt-decode";
import { LOGIN_USER_URL } from "../Constant/UrlConstant";

const API_URL = LOGIN_USER_URL;

function getUsers() {
	return axios.get(`${API_URL}getuser`);
}
function addLoginUser(id, data) {
	return axios.post(`${API_URL}edituser/${id}`, data);
}
function getUserById(id) {
	return axios.get(`${API_URL}getuserbyid/${id}`);
}

// login
function signin(data) {
	return axios.post(`${API_URL}signin`, data, { validateStatus: false });
}

// register
function signup(data) {
	// console.log(data);
	return axios.post(`${API_URL}signup`, data);
}
function isLoggedIn() {
	const data = localStorage.getItem("token");
	if (!data) {
		return false;
	}
	return true;
}

function getToken() {
	return localStorage.getItem("token");
}
// function getUser() {
// 	try {
// 		return jwtDecode(localStorage.getItem("token"));
// 	} catch (e) {
// 		return null;
// 	}
// }
function isAdmin() {
	const role = localStorage.getItem("role");
	return role === "admin";
}

// function isUser() {
// 	return !getUser() ? false : !(getUser().isUser);
// }
function doLogout(id, token) {
	localStorage.removeItem("token");
	localStorage.removeItem("id");

	axios.get(`${API_URL}logout/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	// window.location = "/";
	localStorage.removeItem("accessToken");
	localStorage.removeItem("count");
	window.location = "/";
}

function sendPasswordLink(email) {
	// console.log(email);
	return axios.post(`${API_URL}sendpasswordlink`, email);
}

function forgotPassword(id, token) {
	return axios.get(`${API_URL}forgotpassword/${id}/${token}`);
}

function idToken(data) {
	return axios.post(
		`${API_URL}changepassword/${data.id}/${data.token}/${data.password}`
	);
}

function Loginbymail(data) {
	return axios.post(`${API_URL}loginbymail`, data);
}

function Regisbymail(data) {
	return axios.post(`${API_URL}regisbymail`, data);
}
function varifyOtp(inpOTP) {
	// console.log("kya h ye",inpOTP);
	return axios.post(`${API_URL}varifyotp`, inpOTP);
}

function genrateToken(token) {
	return axios.get(`${API_URL}genratetoken/${token}`);
}
function SocialLoginData(data) {
	return axios.post(`${API_URL}sociallogindata`, data);
}
const SubmitKycDetails = (data) => {
	// return axios.post(`${API_URL}submitkycdetails/${token}`,data);
	return axios.post(`${API_URL}submitkycdetails`, data);
};

export {
	getUsers,
	addLoginUser,
	getUserById,
	isLoggedIn,
	getToken,
	// isUser,
	isAdmin,
	doLogout,
	signup,
	signin,
	sendPasswordLink,
	forgotPassword,
	idToken,
	Regisbymail,
	Loginbymail,
	varifyOtp,
	genrateToken,
	SocialLoginData,
	SubmitKycDetails,
};
