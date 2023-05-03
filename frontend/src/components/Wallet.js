import React, { useEffect, useState, useCallback } from "react";
import useRazorpay from "react-razorpay";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, Table } from "react-bootstrap";
import sweetAlert from "sweetalert2";
import Sidenav from "./Sidenav";
// import ReactDOM from "react-dom";
// import ReactPaginate from "react-paginate";

import {
	depositAmount,
	viewAmount,
	withdrawAmount,
} from "../services/wallet";
import {
	createOrder,
	createVerify,
	getPaymentDetails,
} from "../services/payment";
import { getBankAccounts } from "../services/bank";

export default function Wallet() {
	const [currentAmount, setCurrentAmount] = useState(0);
	const [addAmount, setAddAmount] = useState(0);
	const [withAmount, setWithAmount] = useState();
	const [flag, setFlag] = useState(false);
	const [bankDetails, setBankDetails] = useState();
	const [updateAmount, setUpdateAmount] = useState(false);

	// constant elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

	const Razorpay = useRazorpay();
	const storeId = localStorage.getItem("id");

	const wname = localStorage.getItem("wname");
	const wemail = localStorage.getItem("wemail");
	const wphone = localStorage.getItem("wphone");

	const creditSuccess = () => {
		sweetAlert.fire({
			title: "Amount credited in wallet successfully",
			icon: "success",
		});
	};

	const debitSuccess = () => {
		sweetAlert.fire({
			title: "Amount debited from wallet successfully",
			icon: "success",
		});
	};

	const balanceFailer = () => {
		sweetAlert.fire({
			title: "Insufficient Balance",
			icon: "error",
		});
	};

	useEffect(() => {
		viewAmount(storeId).then((res) => {
			setCurrentAmount(res.data.data.walletinfo.amount);
		});
	}, []);

	useEffect(() => {
		viewAmount(storeId).then((res) => {
			setCurrentAmount(res.data.data.walletinfo.amount);
			setUpdateAmount(false);
		});
	}, [currentAmount, updateAmount]);

	const handleRazorPayment = useCallback(
		(data, process) => {
			const options = {
				key: "rzp_test_pyeJr11ulLzEDM",
				amount: data.data.amount,
				currency: data.data.currency,
				order_id: data.data.id,
				name: wname,
				description: "Test Transaction",

				handler: (res) => {
					createVerify({ response: res }).then(() => {
						getPaymentDetails({
							razorpay_payment_id: res?.razorpay_payment_id,
						}).then((resp) => {
							let amount = String(data.data.amount);
							amount = amount.substring(0, amount.length - 2);

							depositAmount(storeId, {
								amount,
								process,
								transactionId: res?.razorpay_payment_id,
								paymentMethod: resp.data.data.method,
								order_id: data.data.id,
								name: wname,
								email: wemail,
								contact: wphone,
							})
								.then(() => {
									setUpdateAmount(true);
									creditSuccess();
								})
								.catch((err) => err);
						});
					});
				},
				prefill: {
					name: wname,
					email: wemail,
					contact: wphone,
				},
				notes: {
					address: "Neosoft",
				},
				theme: {
					color: "#3399cc",
				},
			};
			const rzpay = new Razorpay(options);
			rzpay.open();
		},
		[Razorpay]
	);

	const handlePayment = (process) => {
		let amount;
		if (process === 1) {
			amount = addAmount;
		} else if (process === 0) {
			amount = withAmount;
		}
		createOrder({ amount }).then((res) => {
			handleRazorPayment(res.data, process);
		});
	};

	const showBankDetails = () => {
		if (Number(currentAmount) < Number(withAmount) + Number(1000)) {
			// 6000 < 5000 + 1001
			balanceFailer();
		} else {
			setFlag(true);
			getBankAccounts(storeId).then((resp) => {
				setBankDetails(resp.data.accounts);
			});
		}
	};

	const HandleChangeAdd = (e) => {
		setAddAmount(e.target.value);
	};

	const HandleChangeWithdrawl = (e) => {
		setWithAmount(e.target.value);
	};

	const generateTransactionId = (length) => {
		let result = "";
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;

		for (let i = 0; i < length; i += 1) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength)
			);
		}

		return `pay_LI${result}`;
	};

	const handleWithdrawlPayment = (process, accountNumber, bankName) => {
		withdrawAmount(storeId, {
			amount: withAmount,
			accountNumber,
			bankName,
			process,
			transactionId: generateTransactionId(12), // will have to make custom transaction id
		})
			.then(() => {
				setUpdateAmount(true);
				debitSuccess();
			})
			.catch(() => {
				balanceFailer();
			});
	};

	return (
		<div>
			<Sidenav />
			<div
				className="mt-5 d-flex justify-content-center text-white py-4 border-bottom text-center pb-4"
				style={{ background: "#b8565f" }}
			>
				<h2 className="pt-2"> Wallet</h2>
			</div>

			<div
				className="container card "
				style={{ marginTop: "100px", width: "600px" }}
			>
				<h2> Current Balance - {currentAmount}</h2>
				<div className="row">
					<div className=" border-right bg-light">
						<Tabs
							defaultActiveKey="gold"
							id="uncontrolled-tab-example"
							className="mb-3 nav nav-tabs nav-fill activeClassMetal"
						>
							<hr />
							<Tab Tab eventKey="gold" title="Add ">
								<div className="form-group ">
									<label
										htmlFor="checkbox-2"
										className="checkbox__label"
									>
										{" "}
										Add amount
									</label>
									<input
										className="form-control w-50"
										type="number"
										name="add"
										value={addAmount}
										onChange={HandleChangeAdd}
										required
									/>
									<div>
										<br />
										<button
											type="button"
											className="btn btn-secondary"
											onClick={() => setAddAmount(500)}
										>
											500{" "}
										</button>
										&nbsp;
										<button
											type="button"
											className="btn btn-secondary"
											onClick={() => setAddAmount(1000)}
										>
											1000{" "}
										</button>
										&nbsp;
										<button
											type="button"
											className="btn btn-secondary"
											onClick={() => setAddAmount(2000)}
										>
											2000{" "}
										</button>
									</div>
									<br />
									<button
										type="button"
										onClick={() => handlePayment(1)}
										className="btn btn-info shadow w-50"
									>
										{" "}
										Add{" "}
									</button>
								</div>
							</Tab>
							<Tab eventKey="silver" title="Withdraw">
								<div className="form-group  ">
									<label
										htmlFor="checkbox-2"
										className="checkbox__label"
									>
										{" "}
										Withdraw amount
									</label>
									<input
										className="form-control w-50"
										type="number"
										onChange={HandleChangeWithdrawl}
										name="withdraw"
										value={withAmount}
										required
									/>
									<div>
										<br />
										<button
											type="button"
											className="btn btn-secondary"
											onClick={() => setWithAmount(500)}
										>
											500{" "}
										</button>
										&nbsp;
										<button
											type="button"
											className="btn btn-secondary"
											onClick={() => setWithAmount(1000)}
										>
											1000{" "}
										</button>
										&nbsp;
										<button
											type="button"
											className="btn btn-secondary"
											onClick={() => setWithAmount(2000)}
										>
											2000{" "}
										</button>
									</div>
									<br />
									<button
										className="btn btn-info shadow w-50"
										onClick={showBankDetails}
										type="button"
									>
										{" "}
										Withdraw{" "}
									</button>

									<section className="container">
										{flag ? (
											<Table striped className="mt-5">
												<thead>
													<tr>
														<th
															style={{
																textAlign:
																	"center",
															}}
														>
															Name
														</th>
														<th
															style={{
																textAlign:
																	"center",
															}}
														>
															Account Number
														</th>
														<th
															style={{
																textAlign:
																	"center",
															}}
														>
															IFSC
														</th>
														<th
															style={{
																textAlign:
																	"center",
															}}
														>
															Bank Name
														</th>
													</tr>
												</thead>

												<tbody>
													{bankDetails?.map(
														(item) => (
															// eslint-disable-next-line no-underscore-dangle
															<tr key={item._id}>
																<td
																	style={{
																		textAlign:
																			"center",
																	}}
																>
																	{item.name}
																</td>
																<td
																	style={{
																		textAlign:
																			"center",
																	}}
																>
																	{
																		item.accountnumber
																	}
																</td>
																<td
																	style={{
																		textAlign:
																			"center",
																	}}
																>
																	{item.ifsc}
																</td>
																<td
																	style={{
																		textAlign:
																			"center",
																	}}
																>
																	{
																		item.bankname
																	}
																</td>
																<td>
																	<Button
																		className="btn btn-info"
																		onClick={() =>
																			handleWithdrawlPayment(
																				0,
																				item.accountnumber,
																				item.bankname
																			)
																		}
																	>
																		Select
																	</Button>
																</td>
															</tr>
														)
													)}
												</tbody>
											</Table>
										) : null}
										<br />
									</section>
								</div>
							</Tab>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
}
