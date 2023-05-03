import React, { useEffect, useState } from "react";
import "../RightSide.css";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import Tabs from "react-bootstrap/Tabs";
import {
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBRow,
	MDBCol,
} from "mdb-react-ui-kit";
import { TradeViewGold, TradeViewSilver } from "../services/SellBuy";
import { getProductGold, getProductSilver } from "../services/Product";
import ChartOfGold from "./ChartOfGold";
import ChartOfSilver from "./ChartOfSilver";
import { isAdmin } from "../services/loginUser";

export default function RightSide() {
	const admin = isAdmin();
	const [productdataSilverPrice, setproductDataSilverPrice] = useState(0);
	const [Price18k, set18kPrice] = useState(0);
	const [goldData, setGoldData] = useState([]);
	const [silverData, setSilverData] = useState([]);

	useEffect(() => {
		(async () => {
			await getProductGold("Gold").then((res) => {
				if (res.data.statusCode === 200) {
					set18kPrice(res.data.data[0].price);
				}
			});
		})();

		getProductSilver("Silver").then((res) => {
			if (res.data.statusCode === 200) {
				setproductDataSilverPrice(res.data.data[0].price);
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

	return (
		<div className="container " style={{ marginTop: "105px" }}>
			<div
				style={{
					marginLeft: "60px",
					marginTop: "40px",
					marginBottom: "100px",
				}}
			>
				<MDBRow>

					{admin ? (
						<>
							<MDBCol sm="3">
								<MDBCard style={{ height: "160px" }}>
									<MDBCardBody>
										<Badge
											bg="dark"
											style={{
												height: "60px",
												width: "90px",
												marginBottom: "2px",
											}}
										>
											<i
												className="fa-sharp fa-solid fa-chart-line mt-2"
												style={{ fontSize: "30px" }}
											/>
										</Badge>

										<MDBCardTitle>Current Price</MDBCardTitle>
										<h6 className="text-success">
											<span className="text-dark">Gold</span> $
											{Price18k}
											<sub>/gm</sub>
										</h6>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
							<MDBCol sm="3">
								<MDBCard style={{ height: "160px" }}>
									<MDBCardBody>
										<Badge
											bg="primary"
											style={{
												height: "60px",
												width: "90px",
												marginBottom: "2px",
											}}
										>
											<i
												className="fa-sharp fa-solid fa-chart-line mt-2"
												style={{ fontSize: "30px" }}
											/>
										</Badge>
										<MDBCardTitle>Current Price</MDBCardTitle>
										<h6 className="text-success">
											<span className="text-dark">Silver</span> $
											{productdataSilverPrice}
											<sub>/gm</sub>
										</h6>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</>
					) : (
						<>
							<MDBCol sm="3">
								<MDBCard style={{ height: "160px" }}>
									<MDBCardBody>
										<Badge
											bg="dark"
											style={{
												height: "60px",
												width: "90px",
												marginBottom: "2px",
											}}
										>
											<i
												className="fa-sharp fa-solid fa-chart-line mt-2"
												style={{ fontSize: "30px" }}
											/>
										</Badge>

										<MDBCardTitle>Current Price</MDBCardTitle>
										<h6 className="text-success">
											<span className="text-dark">Gold</span> $
											{Price18k}
											<sub>/gm</sub>
										</h6>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
							<MDBCol sm="3">
								<MDBCard style={{ height: "160px" }}>
									<MDBCardBody>
										<Badge
											bg="primary"
											style={{
												height: "60px",
												width: "90px",
												marginBottom: "2px",
											}}
										>
											<i
												className="fa-sharp fa-solid fa-chart-line mt-2"
												style={{ fontSize: "30px" }}
											/>
										</Badge>
										<MDBCardTitle>Current Price</MDBCardTitle>
										<h6 className="text-success">
											<span className="text-dark">Silver</span> $
											{productdataSilverPrice}
											<sub>/gm</sub>
										</h6>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>

							<MDBCol sm="3">
								<MDBCard
									style={{ height: "160px" }}
									className="overflow-auto"
								>
									<MDBCardBody>
										<Badge
											bg=""
											style={{
												height: "60px",
												width: "90px",
												marginBottom: "1px",
												backgroundColor: "#DAA520",
											}}
										>
											<i
												className="fa-sharp fa-solid fa-coins mt-2"
												style={{ fontSize: "30px" }}
											/>
										</Badge>

										<MDBCardTitle>Holding Gold</MDBCardTitle>
										<p>
											{goldData?.map((item) => (
												<div
													style={{
														fontSize: "10px",
														marginRight: "0px",
														display: "inline-block",
													}}
													key={item._id}
												>
													<span>
														{" "}
														{item.type}:{item.quantity}
														{item.unit} |
													</span>
													{/* {setValue(item.price)} */}
												</div>
											))}
										</p>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>

							<MDBCol sm="3">
								<MDBCard
									style={{ height: "160px", marginBottom: "10px" }}
								>
									<MDBCardBody>
										<Badge
											bg="secondary"
											style={{
												height: "60px",
												width: "90px",
												marginBottom: "2px",
											}}
										>
											<i
												className="fa-sharp fa-solid fa-coins mt-2 mt-2"
												style={{ fontSize: "30px" }}
											/>
										</Badge>

										<MDBCardTitle>Holding Silver</MDBCardTitle>

										<p>
											{silverData?.map((item) => (
												<div
													style={{
														fontSize: "14px",
														display: "inline-block",
													}}
													key={item._id}
												>
													<span>
														{" "}
														{item.quantity}
														{item.unit} |
													</span>
												</div>
											))}
										</p>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</>
					)}
				</MDBRow>
				<Tabs
					defaultActiveKey="gold"
					id="uncontrolled-tab-example"
					className="mb-3 nav nav-tabs nav-fill"
				>
					<Tab eventKey="gold" title="Gold">
						<ChartOfGold />
					</Tab>
					<Tab eventKey="silver" title="Silver">
						{/* <div className="col-md-6 "> */}
						<ChartOfSilver />
					</Tab>
				</Tabs>
				<br />
			</div>
		</div>
	);
}
