import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { sellItem } from "../services/SellBuy";
import { getProductGold, getProductSilver } from "../services/Product";
import Sidenav from "./Sidenav";
import { getUserById } from "../services/user";
import { sellAmount } from "../services/wallet";
import { sendSellInvoice } from "../services/Invoice";
import { getKyc } from "../services/kyc";

export default function Sell() {
	const navigate = useNavigate();
	const [quant, setQuantGold] = useState(1);
	const [quant2, setQuantSilver] = useState(1);
	const [score, setScore] = useState("18k");
	const [unit, setUnit] = useState("Gram");

	const [productdataSilverCat, setproductDataSilverCat] = useState("");
	const [productDataGoldCat, setproductDataGoldCat] = useState("");
	const [productdataSilverPricegm, setproductDataSilverPricegm] = useState(0);
	const [productdataSilverPricekg, setproductDataSilverPricekg] = useState(0);
	const [Price18k, set18kPrice] = useState(0);
	const [Price22k, set22kPrice] = useState(0);
	const [Price24k, set24kPrice] = useState(0);
	const [Price18kkg, set18kPricekg] = useState(0);
	const [Price22kkg, set22kPricekg] = useState(0);
	const [Price24kkg, set24kPricekg] = useState(0);

	// set user data
	const [UserFname, setUserFname] = useState(" ");
	const [UserLname, setUserLname] = useState("");
	const [UserEmail, setUserEmail] = useState("");
	const fullName = [UserFname, UserLname].join(" ");

	// kyc status
	const [KycDone, setKycDone] = useState(false)
	const [AdminStatus, setAdminStatus] = useState(false)
	const [UserStatus, setUserStatus] = useState(false)

	const id = localStorage.getItem("id");

	const successAlert = () => {
		Swal.fire({
			title: "Gold sell successfully",
			icon: "success",
		});
	};

	const successAlert2 = () => {
		Swal.fire({
			title: "Silver sell successfully",
			icon: "success",
		});
	};

	// const cancelAlert = () => {
	// 	Swal.fire({
	// 		title: "Something went wrong",
	// 		icon: "warning",
	// 	});
	// };

	const cancelAlert = () => {
		Swal.fire({
			title: "You dont have this category of gold or silver please buy first",
			icon: "cancelled",
		});
	};

	// const cancelAlert3 = () => {
	// 	Swal.fire({
	// 		title: "quantity should not be negative or zero",
	// 		icon: "insufficient balance",
	// 	});
	// };

	// get gold Product
	useEffect(() => {
		(async () => {
			await getProductGold("Gold").then((res) => {
				if (res.data.statusCode === 200) {
					// const Data = res.data.data
					// setproductData(Data)
					setproductDataGoldCat(res.data.data[0].category);
					set18kPrice(res.data.data[0].price);
					set22kPrice(res.data.data[1].price);
					set24kPrice(res.data.data[2].price);
					set18kPricekg(res.data.data[3].price);
					set22kPricekg(res.data.data[4].price);
					set24kPricekg(res.data.data[5].price);
				}
			});
			// .catch()
			// 	cancelAlert()
		})();

		// get silver prouct
		getProductSilver("Silver").then((res) => {
			if (res.data.statusCode === 200) {
				setproductDataSilverPricegm(res.data.data[0].price);
				setproductDataSilverPricekg(res.data.data[1].price);
				setproductDataSilverCat(res.data.data[0].category);
			}
		});
		// .catch()
		// 	cancelAlert()
	}, []);

	// add user data
	useEffect(() => {
		const storeId = localStorage.getItem("id");
		(async () => {
			await getUserById(storeId).then((res) => {
				if (res.data.statusCode === 200) {
					setUserFname(res.data.data.fname);
					setUserLname(res.data.data.lname);
					setUserEmail(res.data.data.email);
				}
			});
			// .catch(err => console.log(err, "err"))
		})();
	}, []);

	// KYC data
	useEffect(() => {
		getKyc(id)
			.then((res) => {
				setAdminStatus(res.data.data.adminStatus)
				setUserStatus(res.data.data.userStatus)
				if (res.data.data.adminStatus && res.data.data.userStatus) {
					setKycDone(true)
				}
			});
	}, []);

	const ProcessAlert = () => {
		Swal.fire({
			title: "KYC under process",
			icon: "Process",
		});
	};

	const ProcessAlert2 = () => {
		Swal.fire({
			title: "Please fill KYC form first",
			icon: "Process",
		});
	};


	const handleKyc = () => {
		if (!AdminStatus && UserStatus) {
			ProcessAlert();
			navigate("/dashboard");
		}
		if (!AdminStatus && !UserStatus) {
			ProcessAlert2();
			navigate("/kyc");
		}
	}

	// useEffect(() => {
	// 	const id = localStorage.getItem("id");
	// 	const category = "Gold";
	// 	(async () => {
	// 		await TradeViewGold(id,{id, category})
	// 		.then(res => {
	// 			if (res.data.statusCode === 200) {
	// 				// console.log(res.data.data, "gold data");
	// 			}

	// 		})
	// 	})();

	// 	const category2 = "Silver";
	// 	TradeViewSilver(id,{id, category2})
	// 		.then(res => {
	// 			if (res.data.statusCode === 200) {
	// 				console.log(res.data.data, "silver data");

	// 			}
	// 		})
	// }, [])

	const handleOnChange = (e) => {
		if (!e.target.value <= 0) {
			setQuantGold(e.target.value);
		}
	};
	const handleOnChange2 = (e) => {
		setQuantSilver(e.target.value);
	};

	const goldPrice = () => {
		if (score === "18k" && unit === "Gram") {
			return Price18k;
		}
		if (score === "22k" && unit === "Gram") {
			return Price22k;
		}
		if (score === "24k" && unit === "Gram") {
			return Price24k;
		}
		if (score === "18k" && unit === "kgram") {
			return Price18kkg;
		}
		if (score === "22k" && unit === "kgram") {
			return Price22kkg;
		}
		if (score === "24k" && unit === "kgram") {
			return Price24kkg;
		}
		return Price18k;
	};

	const silverPrice = () => {
		if (unit === "kgram") {
			return productdataSilverPricekg;
		}
		return productdataSilverPricegm;
	};

	const AmountByUnit = () => {
		if (unit === "kgram") {
			return goldPrice() * quant;
		}
		return goldPrice() * quant;
	};

	const AmountByUnit2 = () => {
		if (unit === "kgram") {
			return productdataSilverPricekg * quant2;
		}
		return productdataSilverPricegm * quant2;
	};

	const goldSubmit = (e) => {
		const data = {
			user_id: id,
			category: productDataGoldCat,
			type: score,
			quantity: quant,
			price: goldPrice(),
			unit: unit,
			trade_amount: goldPrice() * quant,
			currentPrice: goldPrice(),
		};
		const amount = goldPrice() * quant;
		e.preventDefault();
		sellItem(id, data).then((res) => {
			if (res.data.statusCode === 201) {
				successAlert();
				sellAmount(id, { amount });
			}
			// if (res.statusCode === 200) {
			// 	cancelAlert();
			// }

			// else if (res.data.statusCode === 400) {
			// 	cancelAlert();
			// }
			// else {
			// 	alert("yyyyyyyyy")
			// 	cancelAlert();
			// }
		});

		// .catch()
		// 	cancelAlert();
	};

	const silverSubmit = (e) => {
		const data = {
			user_id: id,
			category: productdataSilverCat,
			quantity: quant2,
			price: silverPrice(),
			unit: unit,
			trade_amount: silverPrice() * quant2,
			currentPrice: silverPrice(),
		};
		// console.log(data2, "data2")
		const amount = silverPrice() * quant2;
		e.preventDefault();
		sellItem(id, data).then((res) => {
			if (res.data.statusCode === 201) {
				successAlert2();
				sellAmount(id, { amount });
				sendSellInvoice({ fullName, UserEmail, data });
			} else if (res.data.statusCode === 400) {
				cancelAlert();
			}
		});

		// .catch()
		// 	cancelAlert();
	};

	return (
		<>
			<Sidenav />
			<div style={{ marginTop: "80px" }}>
				<Tabs
					defaultActiveKey="gold"
					id="uncontrolled-tab-example"
					className="mb-5"
					style={{ marginLeft: "70px" }}
				>
					<Tab eventKey="gold" title="Gold">
						<form>
							<div className="container bg-light">
								<div className="row mx-5">
									<div className="col-xs-12 col-md-7">
										<div className="byugold-section">
											<div className="tabbed-block">
												<div className="tab-content">
													<div className="gold-row">
														<div className="gold-col">
															<div className="icon row">
																<div className="col-md-6 mt-2">
																	<img
																		src="https://www.digigold.com/media/original/public/content/dYFule3YelOYz0axfHKLnSwI7yE8ReHhcqllCYL0.png"
																		alt="gold-icon"
																	/>{" "}
																	&nbsp;
																	&nbsp;
																	<span>
																		Gold
																		Price{" "}
																	</span>
																</div>
															</div>
															&nbsp;
															<img
																src="https://www.digigold.com/media/original/public/content/vgIEtmW5myuJI6s5PBNefMSrn50kttif8gUYnZpU.gif"
																alt="brodcast-icon"
																width="90"
															/>
														</div>
													</div>

													<div className="quickbuy-row  mt-2	">
														<div className="headings">
															<h3>Quick Sell</h3>
														</div>
														<div className="row ">
															<div
																className="col-md-6 mt-1 text-dark bg-light"
																style={{
																	paddingLeft:
																		"10px",
																}}
															>
																{" "}
																Unit <br />
																<select
																	name="select"
																	style={{
																		border: "none",
																		marginTop:
																			"5px",
																	}}
																	onChange={(
																		e
																	) =>
																		setUnit(
																			e
																				.target
																				.value
																		)
																	}
																>
																	<option value="Gram">
																		gm
																	</option>

																	<option value="kgram">
																		kg
																	</option>
																</select>
															</div>

															<div
																className="col-md-6 mt-1 text-dark bg-light"
																style={{
																	paddingLeft:
																		"10px",
																}}
															>
																{" "}
																Carat <br />
																<select
																	name="select"
																	style={{
																		border: "none",
																		marginTop:
																			"5px",
																	}}
																	onChange={(
																		e
																	) =>
																		setScore(
																			e
																				.target
																				.value
																		)
																	}
																>
																	<option value="18k">
																		18 carat
																	</option>

																	<option value="22k">
																		22 carat
																	</option>

																	<option value="24k">
																		24 carat
																	</option>
																</select>
															</div>
														</div>

														<div className="row mt-2">
															<div className="col-md-6 mt-1 text-dark bg-light">
																<label htmlFor="buy_amount_in_rs">
																	{" "}
																	Quantity
																</label>{" "}
																<br />
																&nbsp;
																<input
																	type="number"
																	name="amountRs"
																	maxLength="7"
																	className="text-field mt-1"
																	// defaultValue={1}
																	id="buy_amount_in_rs"
																	autoComplete="off"
																	required="true"
																	aria-required="true"
																	style={{
																		width: "150px",
																	}}
																	value={
																		quant
																	}
																	onChange={
																		handleOnChange
																	}
																/>
															</div>
														</div>

														<div className="row">
															<div className="col-md-6 mt-2 text-dark">
																<label
																	htmlFor="buy_amount_in_gm"
																	className=""
																>
																	{" "}
																	Price:{" "}
																</label>{" "}
																{goldPrice()}
																&nbsp;
															</div>
															<div className="col-md-6 mt-2 text-dark">
																<label htmlFor="buy_amount_in_gm">
																	{" "}
																	Trade
																	Amount:{" "}
																</label>{" "}
																&nbsp;
																{AmountByUnit()}
															</div>
														</div>

														<div className="btnrow mt-4">
															{KycDone ? (
																<button
																	type="submit"
																	className="btn buynow-btn btn btn-warning"
																	data-toggle="modal"
																	data-target="#popup-login-form-popup"
																	onClick={
																		goldSubmit
																	}
																>
																	Sell Now
																	<img
																		src="https://www.digigold.com/media/original/public/content/lbSV71aXZqKMTLSJLuJd3tGgkP51RmACFKj6mCFg.png"
																		alt=""
																	/>
																</button>
															) : (
																<button
																	type="submit"
																	className="btn buynow-btn btn btn-warning"
																	data-toggle="modal"
																	data-target="#popup-login-form-popup"
																	onClick={
																		handleKyc
																	}
																>
																	Sell Now
																	<img
																		src="https://www.digigold.com/media/original/public/content/lbSV71aXZqKMTLSJLuJd3tGgkP51RmACFKj6mCFg.png"
																		alt=""
																	/>
																</button>
															)
															}
															{/* </div> */}

															{/* <div className="warning mt-3"> */}
															<p
																className="warning mt-3"
																style={{
																	color: "red",
																	fontSize:
																		"13px",
																}}
															>
																<img
																	src="https://www.digigold.com/media/original/public/content/droucVVDbbEIP6BRZIfMzueHZAchObKR16DvOHZW.png"
																	alt=""
																/>{" "}
																&nbsp;For
																Security reason,
																to buy gold
																we’ll need to
																KYC
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</Tab>

					<Tab eventKey="silver" title="Silver">
						<form>
							<div className="container bg-light">
								<div className="row mx-5">
									<div className="col-xs-12 col-md-7">
										<div className="byugold-section">
											<div className="tabbed-block">
												<div className="tab-content">
													<div className="gold-row">
														<div className="gold-col">
															<div className="icon row">
																<div className="col-md-6 mt-2">
																	<img
																		src="https://www.digigold.com/media/original/public/ImageMedia/COUHmLJaUaXdThC7EaTEsUjdspZrCD5QxVF1vnPt.png"
																		alt="silver-icon"
																	/>
																	&nbsp;
																	&nbsp;
																	<span>
																		Sliver
																		Price{" "}
																	</span>
																</div>
																{/* <div className="col-md-6 mt-3">
																	<b>
																		{" "}
																		Current
																		Balance
																		:{" "}
																		<i
																			className="fa fa-inr"
																			aria-hidden="true"
																		/>{" "}
																		500
																	</b>
																</div> */}
															</div>
															&nbsp; &nbsp; &nbsp;
															&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
															<label>
																{
																	productdataSilverPricegm
																}
																<sub>/gm</sub>
															</label>
															&nbsp;
															<img
																src="https://www.digigold.com/media/original/public/content/vgIEtmW5myuJI6s5PBNefMSrn50kttif8gUYnZpU.gif"
																alt="brodcast-icon"
																width="90"
															/>
														</div>
													</div>

													<div className="quickbuy-row mt-2">
														<div className="headings">
															<h3>Quick Sell</h3>
														</div>
														<div className="row ">
															<div className="col-md-6 mt-1 text-dark bg-light">
																<label htmlFor="buy_amount_in_rs">
																	{" "}
																	Quantity{" "}
																</label>{" "}
																&nbsp; <br />
																<input
																	type="text"
																	name="amountRs"
																	maxLength="7"
																	className="text-field"
																	id="buy_amount_in_rs"
																	autoComplete="off"
																	required="true"
																	aria-required="true"
																	value={
																		quant2
																	}
																	onChange={
																		handleOnChange2
																	}
																	style={{
																		width: "150px",
																	}}
																/>
															</div>
															<div
																className="col-md-6 mt-1 text-dark bg-light"
																style={{
																	paddingLeft:
																		"10px",
																}}
															>
																{" "}
																Unit <br />
																<select
																	name="select"
																	style={{
																		border: "none",
																		marginTop:
																			"5px",
																	}}
																	onChange={(
																		e
																	) =>
																		setUnit(
																			e
																				.target
																				.value
																		)
																	}
																>
																	<option value="Gram">
																		gm
																	</option>

																	<option value="kgram">
																		kg
																	</option>
																</select>
															</div>
															<div className="row">
																<div className="col-md-6 mt-4 text-dark bg-light">
																	<label htmlFor="buy_amount_in_gm">
																		{" "}
																		Price:{" "}
																	</label>{" "}
																	&nbsp;
																	{silverPrice()}
																</div>

																<div className="col-md-6 pt-4 text-dark bg-light">
																	<label htmlFor="buy_amount_in_gm">
																		{" "}
																		Trade
																		Amount:{" "}
																	</label>{" "}
																	&nbsp;
																	{AmountByUnit2()}
																</div>
															</div>

															<div className="btnrow mt-4">
																{KycDone ? (
																	<button
																		type="submit"
																		className="btn buynow-btn btn btn-warning"
																		data-toggle="modal"
																		data-target="#popup-login-form-popup"
																		onClick={
																			silverSubmit
																		}
																	>
																		{" "}
																		Sell Now
																		<img
																			src="https://www.digigold.com/media/original/public/content/lbSV71aXZqKMTLSJLuJd3tGgkP51RmACFKj6mCFg.png"
																			alt=""
																		/>
																	</button>
																) : (
																	<button
																		type="submit"
																		className="btn buynow-btn btn btn-warning"
																		data-toggle="modal"
																		data-target="#popup-login-form-popup"
																		onClick={
																			handleKyc
																		}
																	>
																		Sell Now
																		<img
																			src="https://www.digigold.com/media/original/public/content/lbSV71aXZqKMTLSJLuJd3tGgkP51RmACFKj6mCFg.png"
																			alt=""
																		/>
																	</button>
																)

																}
															</div>
														</div>

														<div className="warning mt-3">
															<p
																style={{
																	color: "red",
																	fontSize:
																		"13px",
																}}
															>
																<img
																	src="https://www.digigold.com/media/original/public/content/droucVVDbbEIP6BRZIfMzueHZAchObKR16DvOHZW.png"
																	alt=""
																/>{" "}
																&nbsp; Security
																reason, to buy
																silver we’ll
																need to KYC
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</Tab>
				</Tabs>
			</div>
		</>
	);
}
