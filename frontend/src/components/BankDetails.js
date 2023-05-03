import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import Sidenav from "./Sidenav";
import getBankDetails from "../services/ifsc";
import {
	addBankAccount,
	getBankAccounts,
	removeBankAccount,
} from "../services/bank";
import "react-toastify/dist/ReactToastify.css";

export default function BankDetailsForm() {
	const userID = localStorage.getItem("id");

	const [name, setName] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [ifsc, setIfsc] = useState("");
	const [flag, setflag] = useState();
	const [bankName, setBankName] = useState("");
	const [bankDetails, setBankDetails] = useState();

	// regex
	const regName = /^[a-zA-Z ]+$/;
	const regAccountNumber = /^\d{9,18}$/;
	const regIFSC = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;

	useEffect(() => {
		getBankAccounts(userID)
			.then((result) => {
				setBankDetails(result.data.accounts.reverse());
			})
			.catch((err) => {
				err;
			});

		setBankName("");
		setIfsc("");
		setAccountNumber("");
		setName("");
	}, [flag]);

	const handleDelete = (accid) => {
		removeBankAccount(userID, accid)
			.then((result) => {
				setflag(result);
				toast("account removed successfully");
			})
			.catch((err) => {
				err;
			});
	};

	const handleChangeIfsc = (e) => {
		setIfsc(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		addBankAccount(userID, {
			name,
			accountnumber: accountNumber,
			ifsc,
			bankname: bankName,
		})
			.then(() => {
				toast("Account added successfully");
				setflag(true);
			})
			.catch(() => {
				toast("Something went wrong, please try again");
			});
	};

	const handleBankName = (e) => {
		e.preventDefault();

		getBankDetails({ ifsc })
			.then((res) => {
				setBankName(res.data);
			})
			.catch((err) => {
				err;
			});
	};

	return (
		<>
			<Sidenav />
			<div
				className="mt-5 d-flex justify-content-center text-white py-4 border-bottom text-center pb-4"
				style={{ background: "#b8565f" }}
			>
				<ToastContainer />
				<h2 className="pt-2">Add Bank Details</h2>
			</div>

			<section className="container mt-3 ">
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Form.Group
								className="mb-3"
								controlId="formBasicEmail"
							>
								<Form.Label>Name</Form.Label>
								<Form.Control
									name="name"
									value={name}
									type="text"
									placeholder="Enter Name"
									onChange={(event) => {
										setName(event.target.value);
									}}
									required
								/>
								{name !== "" && !regName.test(name) ? (
									<span className="text-danger">
										{" "}
										Enter valid name
									</span>
								) : null}
							</Form.Group>
						</Col>

						<Col>
							<Form.Group
								className="mb-3"
								controlId="formBasicPassword"
							>
								<Form.Label>Acc Number</Form.Label>
								<Form.Control
									name="acc"
									type="text"
									value={accountNumber}
									placeholder="Enter Acc Number"
									onChange={(event) => {
										setAccountNumber(event.target.value);
									}}
									required
								/>
								{accountNumber !== "" &&
								!regAccountNumber.test(accountNumber) ? (
									<span className="text-danger">
										{" "}
										Enter valid account number
									</span>
								) : null}
							</Form.Group>
						</Col>

						<Col>
							<Form.Group
								className="mb-3"
								controlId="formBasicPassword"
							>
								<Form.Label>IFSC</Form.Label>
								<Form.Control
									name="ifsc"
									type="text"
									value={ifsc}
									placeholder="Enter IFSC Code"
									onChange={handleChangeIfsc}
									onBlur={handleBankName}
								/>
								{ifsc !== "" && !regIFSC.test(ifsc) ? (
									<span className="text-danger">
										{" "}
										Enter valid ifsc code
									</span>
								) : null}
							</Form.Group>
						</Col>

						<Col>
							<Form.Group
								className="mb-3"
								controlId="formBasicPassword"
							>
								<Form.Label>Bank Name</Form.Label>
								<Form.Control
									name="Bankname"
									type="text"
									value={bankName}
									onChange={handleChangeIfsc}
									disabled
								/>
							</Form.Group>
						</Col>
					</Row>
					<div className="d-flex justify-content-center">
						<Button variant="danger" type="submit">
							Add
						</Button>
					</div>
				</Form>

				<Table striped className="mt-5">
					<thead>
						<tr>
							<th style={{ textAlign: "center" }}>Name</th>
							<th style={{ textAlign: "center" }}>
								Account Number
							</th>
							<th style={{ textAlign: "center" }}>IFSC</th>
							<th style={{ textAlign: "center" }}>Bank Name</th>
						</tr>
					</thead>

					<tbody>
						{bankDetails?.map((item) => (
							<tr key={item.id}>
								<td style={{ textAlign: "center" }}>
									{item.name}
								</td>
								<td style={{ textAlign: "center" }}>
									{item.accountnumber}
								</td>
								<td style={{ textAlign: "center" }}>
									{item.ifsc}
								</td>
								<td style={{ textAlign: "center" }}>
									{item.bankname}
								</td>
								<td>
									<Button
										className="btn btn-danger fa-solid fa-trash-can"
										onClick={() => handleDelete(item._id)}
									/>
								</td>
							</tr>
						))}
					</tbody>
					<br />
				</Table>
			</section>
		</>
	);
}
