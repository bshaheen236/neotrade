import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { floor } from "lodash";
import { TradeViewGold, TradeViewSilver } from "../services/SellBuy";
import { getProductGold, getProductSilver } from "../services/Product";
import { viewAmount } from "../services/wallet";

import Sidenav from "./Sidenav";

export default function Portfolio() {
	const [currentAmount, setCurrentAmount] = useState(0);
	const [updateAmount, setUpdateAmount] = useState(false);
	const [SilverCurrentPrice, setSilverCurrentPrice] = useState([]);
	const [productdataSilverPriceGm, setDataSilverPriceGm] = useState(0);
	const [productdataSilverPriceKg, setSilverPriceKg] = useState(0);

	const [goldData, setGoldData] = useState([]);

	const [silverData, setSilverData] = useState([]);

	const [GoldCurrentPrice, setGoldCurrentPrice] = useState([]);
	const [Price18k, set18kPrice] = useState(0);
	const [Price22k, set22kPrice] = useState(0);
	const [Price24k, set24kPrice] = useState(0);

	// to show currect wallete balance
	const storeId = localStorage.getItem("id");

	useEffect(() => {
		viewAmount(storeId).then((res) => {
			setCurrentAmount(res.data.data.walletinfo.amount);
			setUpdateAmount(false);
		});
	}, [currentAmount, updateAmount]);

	useEffect(() => {
		(async () => {
			await getProductGold("Gold").then((res) => {
				if (res.data.statusCode === 200) {
					setGoldCurrentPrice(res.data.data);
					set18kPrice(res.data.data[0].price);
					set22kPrice(res.data.data[1].price);
					set24kPrice(res.data.data[2].price);
				}
			});
		})();

		getProductSilver("Silver").then((res) => {
			if (res.data.statusCode === 200) {
				setSilverCurrentPrice(res.data.data);
				setDataSilverPriceGm(res.data.data[0].price);
				setSilverPriceKg(res.data.data[1].price);
			}
		});
	}, []);

	useEffect(() => {
		const id = localStorage.getItem("id");
		const category = "Gold";
		(async () => {
			await TradeViewGold(id, { id, category }).then((res) => {
				if (res.data.statusCode === 200) {
					setGoldData(res.data.data);
				}
			});
		})();

		const category2 = "Silver";
		TradeViewSilver(id, { id, category2 }).then((res) => {
			if (res.data.statusCode === 200) {
				setSilverData(res.data.data);
			}
		});
	}, []);

	const currentPriceValue = GoldCurrentPrice.map((item) => {
		return {
			type: item.type,
			price: parseInt(item.price),
		};
	});

	const avgGoldPriceValue = goldData.map((item) => {
		return {
			type: item.type,
			price: item.trade_amount / item.quantity,
		};
	});

	const profitLoss = avgGoldPriceValue
		.map((obj1) => {
			let result = {};
			const obj2 = currentPriceValue.find(
				(obj2) => obj2.type === obj1.type
			); // find the matching object in arr2
			if (obj2) {
				// compare ages and perform arithmetic operation
				result = {
					type: obj1.type,
					priceDifference: obj2.price - obj1.price,
					avgGold: obj1.price,
				};
			}
			return result;
		})
		.filter(Boolean); // remove null values from the result array

	const currentPriceSilver = SilverCurrentPrice.map((item) => {
		return {
			unit: item.unit,
			price: parseInt(item.price),
		};
	});
	const avgSilverPrice = silverData.map((item) => {
		return {
			unit: item.unit,
			price: item.trade_amount / item.quantity,
		};
	});

	const SilverProfitLoss = avgSilverPrice
		.map((obj1) => {
			let result = {};
			const obj2 = currentPriceSilver.find(
				(obj2) => obj2.unit === obj1.unit
			);
			if (obj2) {
				result = {
					unit: obj1.unit,
					priceDifference: obj2.price - obj1.price,
					avgSilver: obj1.price,
				};
			}
			return result;
		})
		.filter(Boolean);

	return (
		<div className="container " style={{ marginTop: "105px" }}>
			<Sidenav />
			<div className="row">
				<div className="col-8">
					<h2 className="ps-2">Portfolio</h2>
				</div>
				<div className="col-4 ">
					<span style={{ fontSize: "19px" }}>
						{" "}
						Wallet Balance:{" "}
						<span className="text-danger">${currentAmount}</span>
					</span>{" "}
				</div>
			</div>
			<hr />
			<div className=" px-3 mb-5">
				<div className="row justify-content-space-around mt-3">
					<div
						className="col-4 mt-1 text-center shadow p-2 mb-4   bg-body rounded"
						style={{ borderRadius: "50px" }}
					>
						<h6>Currenct 18 carat gold price</h6>
						<p style={{ color: "#DAA520" }}>
							<b>${Price18k}</b>
							<sub style={{ color: "black" }}>/gm</sub>
						</p>
					</div>
					<div
						className="col-4 mt-1 text-center shadow p-2 mb-4 bg-body rounded"
						style={{ borderRadius: "50px" }}
					>
						<h6>Currenct 22 carat gold price</h6>
						<p style={{ color: "#DAA520" }}>
							<b>${Price22k}</b>
							<sub style={{ color: "black" }}>/gm</sub>
						</p>
					</div>
					<div
						className="col-4 mt-1 text-center shadow p-2 mb-4 bg-body rounded"
						style={{ borderRadius: "50px" }}
					>
						<h6>Currenct 24 carat gold price</h6>
						<p style={{ color: "#DAA520" }}>
							<b>${Price24k}</b>
							<sub style={{ color: "black" }}>/gm</sub>
						</p>
					</div>
				</div>
				<h3
					className="text-center mb-0 border border-1px"
					style={{ color: "#DAA520" }}
				>
					AVAILABLE GOLD
				</h3>
				<div className="row">
					<div className="col-8">
						<Table
							striped
							bordered
							hover
							variant="light"
							className="mt-0 pt-0 px-0 text-center"
						>
							<thead>
								<tr>
									<th> Quantity</th>
									<th> Amount</th>
								</tr>
							</thead>

							<tbody>
								{goldData.map((element) => {
									return (
										<tr>
											<td>
												{element.type}:
												{element.quantity}
												{element.unit}
											</td>
											<td>
												${floor(element.trade_amount)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
					<div className="col-4">
						<Table
							striped
							bordered
							hover
							variant="light"
							className="mt-0 pt-0 px-0 text-center"
							// style={{height:"5%"}}
						>
							<thead>
								<tr>
									<th> Difference</th>
									<th> %</th>
								</tr>
							</thead>

							<tbody>
								{profitLoss.map((element) => {
									return (
										<tr>
											<td>
												{element.priceDifference < 0 ? (
													<span className="text-danger">
														$
														{floor(
															element.priceDifference
														)}{" "}
														<i className="fa-solid fa-circle-arrow-down" />
													</span>
												) : (
													<span className="text-success">
														$
														{floor(
															element.priceDifference
														)}{" "}
														<i className="fa-solid fa-circle-arrow-up" />
													</span>
												)}
											</td>
											<td>
												{Number(
													(element.priceDifference /
														element.avgGold) *
														100
												).toPrecision(3)}
												%
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				</div>
			</div>

			<hr />
			<div className=" px-3 mt-5">
				<div className="row justify-content-space-around mt-3">
					<div
						className="col-6 mt-1 text-center shadow p-2 mb-4   bg-body rounded"
						style={{ borderRadius: "50px" }}
					>
						<h6>Currenct Silver price by gram</h6>
						<p style={{ color: "gray" }}>
							<b>${productdataSilverPriceGm}</b>
							<sub style={{ color: "black" }}>/gm</sub>
						</p>
					</div>
					<div
						className="col-6 mt-1 text-center shadow p-2 mb-4 bg-body rounded"
						style={{ borderRadius: "50px" }}
					>
						<h6>Currenct Silver price by Kgram</h6>
						<p style={{ color: "gray" }}>
							<b>${productdataSilverPriceKg}</b>
							<sub style={{ color: "black" }}>/kg</sub>
						</p>
					</div>
				</div>
				<h3
					className="text-center mb-0 border border-1px"
					style={{ color: "gray" }}
				>
					AVAILABLE SILVER
				</h3>
				<div className="row">
					<div className="col-8">
						<Table
							striped
							bordered
							hover
							variant="light"
							className="mt-0 pt-0 px-0 text-center"
						>
							<thead>
								<tr>
									<th> Quantity</th>
									<th> Amount</th>
								</tr>
							</thead>

							<tbody>
								{silverData.map((element) => {
									return (
										<tr>
											<td>
												{element.quantity}
												{element.unit}
											</td>
											<td>
												${floor(element.trade_amount)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
					<div className="col-4">
						<Table
							striped
							bordered
							hover
							variant="light"
							className="mt-0 pt-0 px-0 text-center"
						>
							<thead>
								<tr>
									<th> Difference</th>
									<th> %</th>
								</tr>
							</thead>

							<tbody>
								{SilverProfitLoss.map((element) => {
									return (
										<tr>
											<td>
												{element.priceDifference < 0 ? (
													<span className="text-danger">
														$
														{floor(
															element.priceDifference
														)}{" "}
														<i className="fa-solid fa-circle-arrow-down" />
													</span>
												) : (
													<span className="text-success">
														$
														{floor(
															element.priceDifference
														)}{" "}
														<i className="fa-solid fa-circle-arrow-up" />
													</span>
												)}
											</td>
											<td>
												{Number(
													(element.priceDifference /
														element.avgSilver) *
														100
												).toPrecision(3)}
												%
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
}
