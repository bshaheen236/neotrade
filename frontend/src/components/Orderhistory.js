import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { floor } from "lodash";
import Sidenav from "./Sidenav";
import { sellOrdersView, buyOrdersView} from "../services/SellBuy";
import "../Pagination.css";

export default function Orderhistory() {
	// sell oders
	const [sellOrders, setsellOrders] = useState([]);
	const [pagesell, setPagesell] = useState(1);
	const [limitsell, setLimitsell] = useState(10);
	const [selltotalCount, setsellTotalCount] = useState(0);
	const [nextsell, setsellNext] = useState(null);
	const [previoussell, setsellPrevious] = useState(null);
	const [currentPagesell, setcurrentPagesell] = useState(1);

	// buy orders
	const [buyOrders, setbuyOrders] = useState([]);
	const [pagebuy, setPagebuy] = useState(1);
	const [limitbuy, setLimitbuy] = useState(10);
	const [buytotalCount, setbuyTotalCount] = useState(0);
	const [nextbuy, setbuyNext] = useState(null);
	const [previousbuy, setbuyPrevious] = useState(null);
	const [currentPagebuy, setcurrentPagebuy] = useState(1);

	// sell actions
	useEffect(() => {
		const id = localStorage.getItem("id");
		const fetchData = async () => {
			const res = await sellOrdersView(id, pagesell, limitsell);
			setsellOrders(res.data.data);
			setsellTotalCount(res.data.totalCount);
			setsellNext(res.data.nextsell);
			setsellPrevious(res.data.previoussell);
			setcurrentPagesell(res.data.current.pagesell);
		};
		fetchData();
	}, [selltotalCount, pagesell, limitsell]);


	const handleNextsell = () => {
		setPagesell(nextsell.pagesell);
		setLimitsell(nextsell.limitsell);
	};

	const handlePrevioussell = () => {
		setPagesell(previoussell.pagesell);
		setLimitsell(previoussell.limitsell);
	};

	const npagesell = Math.ceil(selltotalCount / limitsell);
	const numberssell = [...Array(npagesell + 1).keys()].slice(1)

	function changePagesell(id) {
		setcurrentPagesell(id)
		setPagesell(id);
	}

	// buy actions
	useEffect(() => {
		const id = localStorage.getItem("id");
		const fetchData = async () => {
			const res = await buyOrdersView(id, pagebuy, limitbuy);
			setbuyOrders(res.data.data);
			setbuyTotalCount(res.data.totalCount);
			setbuyNext(res.data.nextbuy);
			setbuyPrevious(res.data.previousbuy);
			setcurrentPagebuy(res.data.current.pagebuy);

		};
		fetchData();
	}, [pagebuy, limitbuy]);



	const handleNextbuy = () => {
		setPagebuy(nextbuy.pagebuy);
		setLimitbuy(nextbuy.limitbuy);
	};

	const handlePreviousbuy = () => {
		setPagebuy(previousbuy.pagebuy);
		setLimitbuy(previousbuy.limitbuy);
	};

	const npage = Math.ceil(buytotalCount / limitbuy);
	const numbers = [...Array(npage + 1).keys()].slice(1)

	function changePage(id) {
		setcurrentPagebuy(id)
		setPagebuy(id);
	}

	return (
		<div>
			<Sidenav />

			<div className="text-center" style={{ marginTop: "72px" }}>
				<Tabs
					defaultActiveKey="gold"
					id="uncontrolled-tab-example"
					className=" mb-2"
					style={{ marginLeft: "70px" }}
				>
					<Tab eventKey="gold" title="Sell">
						
						<Card>
							<Card.Header className="bg-secondary">
								{" "}
								History Of Your Order
							</Card.Header>
							<Card.Body className="text-center">
								<div className="container mt-1">
									<div className="row scrollmenu">
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>Sr.No.</th>
													<th>Order Id</th>
													<th>Category</th>
													<th>Unit</th>
													<th>Quantity</th>
													<th>Price</th>
													<th>Amount</th>
													<th>Date</th>
													<th>Profit_loss</th>
												</tr>
											</thead>
											<tbody>
												{sellOrders.map(
													(element, id) => {
														return (
															<tr>
																<th scope="row">
																	{id + 1}
																</th>
																<td>
																	{
																		element.Order_id
																	}
																</td>
																<td>
																	{
																		element.category
																	}
																	|
																	{
																		element.type
																	}
																</td>
																<td>
																	{
																		element.unit
																	}
																</td>
																<td>
																	{
																		element.quantity
																	}
																</td>
																<td>
																	{
																		element.price
																	}
																</td>
																<td>
																	{
																		element.trade_amount
																	}
																</td>
																<td>
																	{element.createdAt.split("T")[0]}

																</td>
																<td>
																	{element.profit_loss <
																		0 ? (
																		<span className="text-danger">
																			$
																			{floor(
																				element.profit_loss
																			)}{" "}
																			<i className="fa-solid fa-circle-arrow-down" />
																		</span>
																	) : (
																		<span className="text-success">
																			$
																			{floor(
																				element.profit_loss
																			)}{" "}
																			<i className="fa-solid fa-circle-arrow-up" />
																		</span>
																	)}
																</td>
															</tr>
														);
													}
												)}
											</tbody>
										</Table>
									</div>
								</div>
							</Card.Body>
						</Card>
						<div className="pagination">
							{previoussell && (
								<li className="page-item">
									<button
										onClick={handlePrevioussell}
										type="button"
									>
										<i className="fa-solid fa-angles-left mt-2" />...
									</button>
								</li>
							)}
							{numberssell.map((n) => (
								<li className={`page-item ${currentPagesell === n ? "active" : ""}`} key={n + 1}>
									<a href="#" className="page-link"
										onClick={() => changePagesell(n)}> {n}
									</a>

								</li>
							))}
							{nextsell && (
								<li className="page-item">
									<button onClick={handleNextsell} type="button">
										...<i className="fa-solid fa-angles-right mt-2" />
									</button>
								</li>
							)}
						</div>
						<hr />
					</Tab>

					<Tab eventKey="silver" title="Buy">
						<div className="text-center ml-4" />

						<Card>
							<Card.Header
								className="bg-secondary text-bold"
								style={{ fontSize: "20px" }}
							>
								{" "}
								History Of Your Order
							</Card.Header>
							<Card.Body className="text-center">
								<div className="container mt-1">
									<div className="row scrollmenu">
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>Sr.No.</th>
													<th>Order Id</th>
													<th>Category</th>
													<th>Unit</th>
													<th>Quantity</th>
													<th>Price</th>
													<th>Date</th>
													<th>Amount</th>
													{/* <th>Date</th> */}
												</tr>
											</thead>
											<tbody>
												{buyOrders.map(
													(element, id) => {
														return (
															<tr>
																<th scope="row">
																	{id + 1}
																</th>
																<td>
																	{
																		element.Order_id
																	}
																</td>
																<td>
																	{
																		element.category
																	}
																	|
																	{
																		element.type
																	}
																</td>
																<td>
																	{
																		element.unit
																	}
																</td>
																<td>
																	{
																		element.quantity
																	}
																</td>
																<td>
																	{
																		element.price
																	}
																</td>
																<td>
																	{element.createdAt.split("T")[0]}
																</td>
																<td>
																	{
																		element.trade_amount + (element.trade_amount * 2) / 100
																	}
																</td>

															</tr>
														);
													}
												)}
											</tbody>
										</Table>
									</div>
								</div>
							</Card.Body>
						</Card>
						<div className="pagination">
							{/* Render pagination controls */}
							{previousbuy && (
								<li className="page-item">
									<button
										onClick={handlePreviousbuy}
										type="button"
									>
										<i className="fa-solid fa-angles-left mt-2" />...
									</button>
								</li>
							)}
							{numbers.map((n) => (
								<li className={`page-item ${currentPagebuy === n ? "active" : ""}`} key={n + 1}>
									<a href="#" className="page-link"
										onClick={() => changePage(n)}> {n}
									</a>

								</li>
							))
							}
							{nextbuy && (
								<li className="page-item">
									<button onClick={handleNextbuy} type="button">
										...<i className="fa-solid fa-angles-right mt-2" />
									</button>
								</li>
							)}
						</div>
						<hr />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}
