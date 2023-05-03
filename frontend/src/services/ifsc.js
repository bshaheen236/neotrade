import axios from "axios";
import { IFSC_URL } from "../Constant/UrlConstant";

const API = IFSC_URL;

const getBankDetails = (ifsc) => {
	return axios.post(`${API}`, ifsc);
};

export default getBankDetails;
