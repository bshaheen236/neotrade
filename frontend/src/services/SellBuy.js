import axios from "axios";
import { SELL_BUY_URL } from "../Constant/UrlConstant";

const token = localStorage.getItem("token");
const instance = axios.create({
	baseURL: SELL_BUY_URL,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

// Holding data
function TradeViewGold(id, category) {
	return instance.post(`tradeViewgold/${id}`, category);
}

function TradeViewSilver(id, category2) {
	return instance.post(`tradeViewsilver/${id}`, category2);
}

function TradeViews(id) {
	return instance.get(`tradeViews/${id}`);
}
// sell data
function sellItem(id, data) {
	return instance.post(`sell/${id}`, data);
}

function sellView(id) {
	return instance.get(`sellview/${id}`);
}

function sellOrdersView(id, pagesell, limitsell) {
	return instance.get(
		`sellordersview/${id}?pagesell=${pagesell}&limitsell=${limitsell}`
	);
}

function exportSellData(pagesell, limitsell) {
	return instance.get(`exportselldata?pagesell=${pagesell}&limitsell=${limitsell}`);
}

// cart data
function AddCart(id, data) {
	return instance.post(`addcart/${id}`, data);
}

function findUserTrade(id) {
	return instance.get(`findUsertrade/${id}`);
}

function deleteCart(id) {
	return instance.delete(`deletecart/${id}`);
}

function updateCart(id, quantity) {
	return instance.put(`updatecart/${id}`, quantity);
}
// buy data
function buyTradeItems(id, data) {
	return instance.post(`/buy/${id}`, data);
}

function buyOrdersView(id, pagebuy, limitbuy) {
	return instance.get(
		`buyordersview/${id}?pagebuy=${pagebuy}&limitbuy=${limitbuy}`
	);
}
function buyView(id) {
	return instance.get(`buyview/${id}`);
}
function exportBuyData(pagebuy, limitbuy) {
	return instance.get(
		`exportbuydata?pagebuy=${pagebuy}&limitbuy=${limitbuy}`
	);
}

export {
	TradeViewGold,
	TradeViewSilver,
	TradeViews,
	sellItem,
	AddCart,
	findUserTrade,
	deleteCart,
	updateCart,
	buyTradeItems,
	sellOrdersView,
	buyOrdersView,
	buyView,
	sellView,
	exportSellData,
	exportBuyData
};
