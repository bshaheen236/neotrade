import axios from "axios";
import { USER_URL } from "../Constant/UrlConstant";

const token = localStorage.getItem("token");

const instance = axios.create({
	baseURL: USER_URL,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});
function addUser(data) {
	return instance.post("signup", data);
}

function getUsers() {
	return instance.get("getusers");
}
function editUser(id, data) {
	return instance.put(`edituser/${id}`, data);
}
function deleteUser(id) {
	// console.log(id,"hhhhhhhhar")
	return instance.delete(`deleteuser/${id}`);
}
function getUserById(id) {
	return instance.get(`getuserbyid/${id}`);
}
export { addUser, getUsers, editUser, deleteUser, getUserById };
