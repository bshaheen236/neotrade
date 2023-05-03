import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Sidenav from "./Sidenav";
import {
	getProductGold,
	updateProductPrice,
	getProductSilver,
} from "../services/Product";
import "../EditProduct.css";

export default function EditProduct() {
	const [GoldData, setGoldData] = useState([]);
	const [Data, SetData] = useState({});
	const [disable, setDisable] = useState(true);
	const [SilverData, setSilverData] = useState([]);
	const [inputValue, setInputValue] = useState();

	const handleSet = (category, unit, id, price, type) => {
		SetData({ category, unit, id, price, type });
		setInputValue(price)
		setDisable(false);
	};

	// set gold price
	useEffect(() => {
		(async () => {
			await getProductGold("Gold").then((res) => {
				if (res.data.statusCode === 200) {
					setGoldData(res.data.data);
				}
			});
			// .catch(err => console.log(err, "err"))
		})();
	}, []);

	// set silver price
	useEffect(() => {
		(async () => {
			await getProductSilver("Silver").then((res) => {
				if (res.data.statusCode === 200) {
					// setSilverPriceGm(res.data.data[0].price);
					// setSilverPriceGmId(res.data.data[0]._id);
					// setSilverPriceKg(res.data.data[1].price);
					// setSilverPriceKgId(res.data.data[1]._id);
					setSilverData(res.data.data);
				}
			});
		})();
	}, []);

	const successAlert = () => {
		Swal.fire({
			title: "Gold price updated successfully",
			icon: "success",
		});
	};
	const cancelAlert = () => {
		Swal.fire({
			title: "Price data not match",
			icon: "cancelled",
		});
	};
	const cancelAlert2 = () => {
		Swal.fire({
			title: "Price value should be grater then 100",
			icon: "cancelled",
		});
	};

	// update gold price
	const handleUpdate = useCallback(
		async (id, price) => {
			if (price <= 100) {
				cancelAlert2();
			} else {
				updateProductPrice(id, { price });
				await getProductGold("Gold").then((res) => {
					if (res.data.statusCode === 200) {
						successAlert();
						setGoldData(res.data.data);
					} else {
						cancelAlert();
					}
				});
			}
		},
		[GoldData]
	);

	// update silver price
	const handleUpdate2 = useCallback(
		async (id, price) => {
			if (price <= 100) {
				cancelAlert2();
			} else {
				await updateProductPrice(id, { price });
				await getProductSilver("Silver").then((res) => {
					if (res.data.statusCode === 200) {
						successAlert();
						setSilverData(res.data.data);
					} else {
						cancelAlert();
					}
				});
			}
		},
		[SilverData]
	);

	// console.log(Data.price, "hhhhhhhhhh");

	return (
		<div className="container " style={{ marginTop: "105px" }}>
			<Sidenav />
			<h2 className="text-center">Change Product Price</h2>
			<section className="">
				<div className="container py-3 ">
					<div className="row d-flex justify-content-center align-items-center">
						<div className="col-lg-8 col-xl-6">
							<div className="card rounded-3">
								<div className="card-body p-4 p-md-5">
									<form className="px-md-2">
										<div className=" mb-4">
											<label
												className="form-label"
												htmlFor="form3Example1q"
											>
												Category
											</label>
											<p
												className="border border-secondary"
												style={{
													width: "420px",
													height: "30px",
												}}
											>
												{Data.category}
											</p>
										</div>
										<div className="mb-4">
											{/* <input type="text" placeholder="unit" style={{ width: "420px" }} /> */}
											<label
												className="form-label"
												htmlFor="form3Example1q"
											>
												Unit
											</label>
											<p
												className="border border-secondary"
												style={{
													width: "420px",
													height: "30px",
												}}
											>
												{Data.unit}
											</p>
										</div>
										{Data.category === "Gold" && (
											<div className="mb-4">
												{/* <input type="text" placeholder="type" style={{ width: "420px" }} /> */}
												<label
													className="form-label"
													htmlFor="form3Example1q"
												>
													Type
												</label>
												<p
													className="border border-secondary"
													style={{
														width: "420px",
														height: "30px",
													}}
												>
													{Data.type}
												</p>
											</div>
										)}

										<div className="mb-4">
											<label
												className="form-label"
												htmlFor="form3Example1q"
											>
												Price
											</label>{" "}
											<br />
											<input
												type="number"
												maxLength="7"
												placeholder="Enter price"
												autoComplete="off"
												className="border border-secondary"
												required="true"
												aria-required="true"
												// defaultValue={45}
												value={inputValue}
												onChange={(e) =>
													setInputValue(
														e.target.value
													)
												}
												style={{ width: "420px" }}
											/>
											{/* <input type="text" className="border border-secondary" placeholder="Enter price" style={{ width: "420px" }} /> */}
										</div>

										{Data.category === "Gold" ? (
											<button
												type="submit"
												className="btn btn-success btn-lg"
												style={{ textAlign: "center" }}
												disabled={disable}
												onClick={() =>
													handleUpdate(
														Data.id,
														inputValue
													)
												}
											>
												Submit
											</button>
										) : (
											<button
												type="submit"
												className="btn btn-success btn-lg"
												style={{ textAlign: "center" }}
												disabled={disable}
												onClick={() =>
													handleUpdate2(
														Data.id,
														inputValue
													)
												}
											>
												Submit
											</button>
										)}
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className=" pt-2">
				<p className="border border-1px solid text-center mb-0 bg-primary text-white">
					Edit Gold price
				</p>
				<Table striped bordered hover variant="light" className="mt-0">
					<thead>
						<tr>
							<th> Gold type</th>
							<th>Current Gold Price</th>
							<th>Edit Gold Price</th>
						</tr>
					</thead>
					<tbody>
						{GoldData.map((element) => {
							return (
								<tr>
									<td>
										{" "}
										{element.type}|{element.unit}
									</td>
									<td> {element.price}</td>
									<td>
										<button
											className="text-white"
											type="button"
											value={element.category}
											onClick={() =>
												handleSet(
													element.category,
													element.unit,
													element._id,
													element.price,
													element.type
												)
											}
											style={{
												backgroundColor: " #0d6efd",
												border: "none",
											}}
										>
											{" "}
											Action
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>

			<div className=" pt-0">
				<p className="border border-1px solid text-center mb-0 bg-primary text-white">
					Edit Silver price
				</p>
				<Table striped bordered hover variant="light" className="mt-0">
					<thead>
						<tr>
							<th> Silver type</th>
							<th>Current Silver Price</th>
							<th>Edit Silver Price</th>
						</tr>
					</thead>
					<tbody>
						{SilverData.map((element) => {
							return (
								<tr>
									<td> {element.unit}</td>
									<td> {element.price}</td>
									<td>
										<button
											className="text-white"
											type="button"
											// value={element.category}
											onClick={() =>
												handleSet(
													element.category,
													element.unit,
													element._id,
													element.price
												)
											}
											style={{
												backgroundColor: " #0d6efd",
												border: "none",
											}}
										>
											{" "}
											Action
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</div>
	);
}
