import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getProductGold, getProductSilver } from "../services/Product";
import { AddCart } from "../services/SellBuy";
import Sidenav from "./Sidenav";
import { getKyc } from "../services/kyc";

export default function Buy() {
	const navigate = useNavigate();
	const [quant, setQuantGold] = useState(1);
	const [quant2, setQuantSilver] = useState(1);
	const [score, setScore] = useState("18k");
	const [unit, setUnit] = useState("Gram");

	// Gold data
	const [productData, setproductData] = useState({});
	const [Gold18kGMQ, setGold18kGMQ] = useState(0);
	const [Gold22kGMQ, setGold22kGMQ] = useState(0);
	const [Gold24kGMQ, setGold24kGMQ] = useState(0);
	const [Gold18kKGQ, setGold18kKGQ] = useState(0);
	const [Gold22kKGQ, setGold22kKGQ] = useState(0);
	const [Gold24kKGQ, setGold24kKGQ] = useState(0);

	// silver data
	const [productdataSilverPricegm, setproductDataSilverPricegm] = useState(0);
	const [productdataSilverPricekg, setproductDataSilverPricekg] = useState(0);
	const [productdataSilverCat, setproductDataSilverCat] = useState(0);
	const [productDataGoldCat, setproductDataGoldCat] = useState(0);
	const [SilverQGM, setSilverQGM] = useState(0);
	const [SilverQKG, setSilverQKG] = useState(0);

	// kyc status
	const [KycDone, setKycDone] = useState(false)
	const [AdminStatus, setAdminStatus] = useState(false)
	const [UserStatus, setUserStatus] = useState(false)

	// KYC data
	useEffect(() => {
		const id = localStorage.getItem("id");
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

	const ProcessAlert3 = () => {
		Swal.fire({
			title: "Insufficient Quantity, please check",
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

	// product state
	const successAlert = () => {
		Swal.fire({
			title: "Gold added successfully",
			icon: "success",
		});
	};
	const successAlert2 = () => {
		Swal.fire({
			title: "Silver added successfully",
			icon: "success",
		});
	};

	useEffect(() => {
		(async () => {
			await getProductGold("Gold").then((res) => {
				if (res.data.statusCode === 200) {
					const Data = res.data.data;
					setproductData(Data);
					setproductDataGoldCat(res.data.data[0].category);
					setGold18kGMQ(res.data.data[0].quantity);
					setGold22kGMQ(res.data.data[1].quantity);
					setGold24kGMQ(res.data.data[2].quantity);
					setGold18kKGQ(res.data.data[3].quantity);
					setGold22kKGQ(res.data.data[4].quantity);
					setGold24kKGQ(res.data.data[5].quantity);
				}
			});
		})();

		getProductSilver("Silver").then((res) => {
			if (res.data.statusCode === 200) {
				setproductDataSilverPricegm(res.data.data[0].price);
				setproductDataSilverPricekg(res.data.data[1].price);
				setproductDataSilverCat(res.data.data[0].category);
				setSilverQGM(res.data.data[0].quantity);
				setSilverQKG(res.data.data[1].quantity);
			}
		});
	}, []);

	const cancelAlert = () => {
		Swal.fire({
			title: "insufficient balance",
			icon: "error",
		});
	};

	const handleOnChange = (e) => {
		setQuantGold(e.target.value);
	};
	const handleOnChange2 = (e) => {
		setQuantSilver(e.target.value);
	};




	const goldPrice = () => {
		if (score === "18k" && unit === "Gram") {
			return productData[0].price;
		}
		if (score === "22k" && unit === "Gram") {
			return productData[1].price;
		}
		if (score === "24k" && unit === "Gram") {
			return productData[2].price;
		}
		if (score === "18k" && unit === "kgram") {
			return productData[3].price;
		}
		if (score === "22k" && unit === "kgram") {
			return productData[4].price;
		}
		if (score === "24k" && unit === "kgram") {
			return productData[5].price;
		}
		return productData[0].price;
	};

	const AmountByUnit = () => {
		if (unit === "kgram") {
			return goldPrice() * quant;
		}
		return goldPrice() * quant;
	};

	const GoldQuant = () => {
		if (score === "18k" && unit === "Gram") {
			return Gold18kGMQ;
		}
		if (score === "22k" && unit === "Gram") {
			return Gold22kGMQ;
		}
		if (score === "24k" && unit === "Gram") {
			return Gold24kGMQ;
		}
		if (score === "18k" && unit === "kgram") {
			return Gold18kKGQ;
		}
		if (score === "22k" && unit === "kgram") {
			return Gold22kKGQ;
		}
		if (score === "24k" && unit === "kgram") {
			return Gold24kKGQ;
		}
		return Gold18kGMQ;
	};


	const goldSubmit = (e) => {
		const id = localStorage.getItem("id");
		const data = {
			category: productDataGoldCat,
			type: score,
			quantity: quant,
			price: goldPrice(),
			unit: unit,
			trade_amount: goldPrice() * quant,
		};
		e.preventDefault();
		if (GoldQuant() < quant) {
			ProcessAlert3()
		}
		else {
			AddCart(id, data)
				.then((res) => {
					if (res.data.statusCode === 201) {
						successAlert();
						navigate("/cart");
					} else {
						cancelAlert();
					}
				})
				.catch((err) => err);
		}
	};

	const silverPrice = () => {
		if (unit === "kgram") {
			return productdataSilverPricekg;
		}
		return productdataSilverPricegm;
	};
	const AmountByUnit2 = () => {
		if (unit === "kgram") {
			return productdataSilverPricekg * quant2;
		}
		return productdataSilverPricegm * quant2;
	};
	const silverQuant = () => {
		if (unit === "kgram") {
			return SilverQKG;
		}
		return SilverQGM;
	};

	const silverSubmit = (e) => {
		const id = localStorage.getItem("id");
		const data2 = {
			category: productdataSilverCat,
			quantity: quant2,
			price: silverPrice(),
			unit: unit,
			trade_amount: silverPrice() * quant2,
		};
		e.preventDefault();
		if (silverQuant() < quant2) {
			ProcessAlert3();
		}
		else {
			AddCart(id, data2)
				.then((res) => {
					if (res.data.statusCode === 201) {
						successAlert2();
						navigate("/cart");
					} else {
						cancelAlert();
					}
				})
				.catch((err) => err);
		}
	};


	return (
		<>
			<Sidenav />
			<div style={{ marginTop: "80px" }}>
				<Tabs
					defaultActiveKey="gold"
					id="uncontrolled-tab-example"
					className=" mb-5 "
					style={{ marginLeft: "70px" }}
				>
					<Tab
						eventKey="gold"
						title="Gold"
					>
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
																	/>
																	&nbsp;
																	&nbsp;
																	<span>
																		Gold
																		Price{" "}
																	</span>
																</div>
															</div>

															<div className="row">
																<div className="col-6">
																	&nbsp;

																	<img
																		src="https://www.digigold.com/media/original/public/content/vgIEtmW5myuJI6s5PBNefMSrn50kttif8gUYnZpU.gif"
																		alt="brodcast-icon"
																		width="90"
																	/>

																</div>
																<div className="col-6">
																	<p className="text-danger">
																		Admin has Avalable Gold: {GoldQuant()}
																	</p>

																</div>
															</div>

														</div>
													</div>

													<div className="quickbuy-row mt-2">
														<div className="headings">
															<h3>Quick Buy</h3>
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
																	id="buy_amount_in_rs"
																	autoComplete="off"
																	value={
																		quant
																	}
																	onChange={
																		handleOnChange
																	}
																	required="true"
																	aria-required="true"
																	style={{
																		width: "150px",
																	}}
																/>
															</div>
														</div>
														{productData.length >
															0 && (
																<div className="row">
																	<div className="col-md-6 mt-2  text-dark">
																		<label htmlFor="buy_amount_in_gm">
																			{" "}
																			Price:{" "}
																		</label>{" "}
																		&nbsp;
																		{goldPrice()}
																	</div>

																	<div className="col-md-6 mt-2  text-dark">
																		<label htmlFor="buy_amount_in_gm">
																			{" "}
																			Trade
																			Amount:{" "}
																		</label>{" "}
																		&nbsp;
																		{AmountByUnit()}
																	</div>
																</div>
															)}

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
																	Add To Cart
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
															)}
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
															&nbsp; For Security
															reason, to buy gold
															we’ll need to KYC
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</Tab>

					<Tab
						eventKey="silver"
						title="Silver"
					>
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

															</div>
															&nbsp; &nbsp; &nbsp;
															&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
															<label>
																{
																	productdataSilverPricegm
																}
																<sub>/gm</sub>
															</label>
															<div className="row">
																<div className="col-6">
																	&nbsp;

																	<img
																		src="https://www.digigold.com/media/original/public/content/vgIEtmW5myuJI6s5PBNefMSrn50kttif8gUYnZpU.gif"
																		alt="brodcast-icon"
																		width="90"
																	/>

																</div>
																<div className="col-6">
																	<p className="text-danger">
																		Admin has Avalable Gold: {silverQuant()}
																	</p>

																</div>
															</div>
														</div>
													</div>

													<div className="quickbuy-row mt-2">
														<div className="headings">
															<h3>Quick Buy</h3>
														</div>
														<div className="row ">
															<div className="col-md-6 mt-1 text-dark bg-light">
																<label htmlFor="buy_amount_in_rs">
																	{" "}
																	Quantity
																	<sub>
																		/gm
																	</sub>
																</label>{" "}
																&nbsp; <br />
																<input
																	type="number"
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
														</div>
														<div className="row">
															<div className="col-md-6 mt-4 text-dark bg-light">
																<label htmlFor="buy_amount_in_gm">
																	{" "}
																	Price{" "}
																</label>{" "}
																&nbsp;
																{silverPrice()}
															</div>

															<div className="col-md-6 mt-4 text-dark bg-light">
																<label htmlFor="buy_amount_in_gm">
																	{" "}
																	Trade Amount{" "}
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
																	Add To Cart
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
															)}
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
