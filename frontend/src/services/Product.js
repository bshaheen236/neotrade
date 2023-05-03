import axios from "axios";
import { PRODUCT_URL } from "../Constant/UrlConstant";

const token = localStorage.getItem("token");

const instance = axios.create({
	baseURL: PRODUCT_URL,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

function getProductGold(category) {
	return instance.get(`getproduct/${category}`);
}
function getProductSilver(category) {
	return instance.get(`getproduct/${category}`);
}

function updateProductPrice(id, data) {
	return instance.put(`updateprice/${id}`, data);
}

export { getProductGold, getProductSilver, updateProductPrice };
