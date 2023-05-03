import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { CSVLink } from "react-csv";
import Sidenav from "./Sidenav";
import { getUsersInvoices } from "../services/Invoice";
import "../Pagination.css";

export default function TradingInvoice() {
	const [invoice, setInvoice] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [totalCount, setTotalCount] = useState(0);
	const [next, setNext] = useState(null);
	const [previous, setPrevious] = useState(null);
	const [currentPage, setcurrentPage] = useState(1);
	const [taxReport,setTaxReport]=useState("");

	useEffect(() => {
		const fetchData = async () => {
			const response = await getUsersInvoices(page, limit);
			setInvoice(response.data.results.data);
			setTotalCount(response.data.results.totalCount);
			setNext(response.data.results.next);
			setPrevious(response.data.results.previous);
			setcurrentPage(response.data.results.current.page);

			// export data
			const data = response.data.withoutPag
			const data2 = data.map((item =>
				[item.fullName, item.UserEmail, item.tax, item.totalAmount]))
			data2.unshift(["UserName", "UserEmail", "ItemTax", "TotalAmount(ExcludingTax)"])
			setTaxReport(data2)
		};
		fetchData();
	}, [totalCount, page, limit]);

	const handleNext = () => {
		setPage(next.page);
		setLimit(next.limit);
	};

	const handlePrevious = () => {
		setPage(previous.page);
		setLimit(previous.limit);
	};

	const npage = Math.ceil(totalCount / limit);
	const numbers = [...Array(npage + 1).keys()].slice(1)

	function changePage(id) {
		setcurrentPage(id)
		setPage(id);
	}

	return (
		<div>
			<Sidenav />
			<div className="text-center" style={{ marginTop: "72px" }}>
				<div className="text-center mt-5 mb-0 ">
					<h1>Users Invoice</h1>
					<CSVLink data={taxReport}
						className="btn btn-primary">
						Export User Tax Report
					</CSVLink>
				</div>
			</div>
			<div>
				<Card>
					<Card.Header className="bg-secondary text-center">
						{" "}
						History Of Your Order
					</Card.Header>
					<Card.Body className="text-center">
						<div className="container mt-1">
							<div className="row">
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>Sr.No.</th>
											<th>Invoice No.</th>
											<th>User Name</th>
											<th>User Email</th>
											<th>purchased Items</th>
											<th>Tax</th>
											<th>Total Amount</th>
										</tr>
									</thead>
									<tbody>
										{invoice.map((element, id) => {
											return (
												<tr>
													<th scope="row">
														{id + 1}
													</th>
													<td>
														{element.invoiceNumber}
													</td>
													<td>{element.fullName}</td>
													<td>{element.UserEmail}</td>
													<td>
														{element.purchasedItems.map(
															(e) => {
																return (
																	<p>
																		{
																			e.category
																		}
																		|
																		{e.type}
																		|
																		{
																			e.price
																		}
																		|
																		{
																			e.quantity
																		}
																		{e.unit}{" "}
																		<br />
																	</p>
																);
															}
														)}
													</td>
													<td>{element.tax}</td>
													<td>
														{element.totalAmount} (Excluding tax)
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</div>
						</div>
					</Card.Body>
				</Card>
				<div className="pagination">
					{previous && (
						<li className="page-item">
							<button onClick={handlePrevious} type="button">
								<i className="fa-solid fa-angles-left mt-2" />...
							</button>
						</li>
					)}

					{numbers.map((n) => (
						<li className={`page-item ${currentPage === n ? "active" : ""}`} key={n + 1}>
							<a href="#" className="page-link"
								onClick={() => changePage(n)}> {n}
							</a>

						</li>
					))
					}
					{next && (
						<li className="page-item">
							<button onClick={handleNext} type="button">
								...<i className="fa-solid fa-angles-right mt-2" />
							</button>
						</li>
					)}
				</div>
				<hr />
			</div>
		</div>
	);
}
