import React, { useEffect, useState } from "react";
import { viewAmount } from "../services/wallet.api";

function func() {
	const [amount, setAmount] = useState();
	useEffect(() => {
		viewAmount("63d7738201137f092b05fcda")
			.then((res) => {
				// console.log(res.data.data.amount);
				setAmount(res.data.data.amount);
			})
			.catch((err) => err);
	}, []);

	useEffect(() => {
		viewAmount("63d7738201137f092b05fcda")
			.then((res) => {
				// console.log(res.data.data.amount);
				setAmount(res.data.data.amount);
			})
			.catch((err) => err);
	}, [amount]);
	return <h1>Current Amount {amount}</h1>;
}
export default func;

// import "bootstrap/dist/css/bootstrap.min.css";
// import { useState, useEffect ,useContext} from "react";

// import { Button, Modal } from "react-bootstrap";
// import Table from "react-bootstrap/Table";
// // import Grid from "@mui/material/Grid";
// // import { isAdmin } from "../services/loginUser";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import CreateIcon from "@mui/icons-material/Create";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// // import { NavLink } from "react-router-dom";/
// import { getUsers,deleteUser } from "../services/user";
// import Sidenav from "./Sidenav";

// function ManageUser() {
// 	const [show, setShow] = useState(false);

// 	const handleClose = () => setShow(false);

// 	const [users, setUsers] = useState([]);

// 	useEffect(() => {
// 		(async () => {
// 			await getUsers()
// 				.then((res) => {
// 					if (res.data.statusCode === 200) {
// 						setUsers(res.data.data);
// 					}
// 				})
// 				.catch((err) => console.log(err));
// 		})();
// 	}, []);

// 	return (
// 		<div className="mt-5">
// 			<Sidenav/>
// 			<div className="container mt-5">
// 				<div className="row mt-4 text-center">
// 					<h3>User Details</h3>
// 						</div>

// 				<div className="row">

// 						<Table striped bordered hover>
// 							<thead>
// 								<tr>
// 									<th>Sr.No.</th>
// 									<th>User_Id</th>
// 									<th>First Name</th>
// 									<th>Last Name</th>
// 									<th>Email</th>
// 									<th>Mobile</th>
// 									<th>Actions</th>
// 								</tr>
// 							</thead>
// 							<tbody>

// {
// 	users.map((element, id) => {
// 		return (

// 				<tr>
// 					<th scope="row">{id + 1}</th>
// 					<td>{element._id}</td>
// 					<td>{element.fname}</td>
// 					<td>{element.lname}</td>
// 					<td>{element.email}</td>
// 					<td>{element.phone}</td>
//
// 				</tr>

// 		)
// 	})
// }
// </tbody>
// 						</Table>

// 				</div>

// 				{/ <!--- Model Box ---> /}
// 				<div className="model_box">
// 					<Modal
// 						show={show}
// 						onHide={handleClose}
// 						backdrop="static"
// 						keyboard={false}
// 					>
// 						<Modal.Header closeButton>
// 							<Modal.Title>Add User</Modal.Title>
// 						</Modal.Header>
// 						<Modal.Body>
// 							<form>
// 								<div className="form-group">
// 									<input
// 										type="email"
// 										className="form-control"
// 										id="exampleInputEmail1"
// 										aria-describedby="emailHelp"
// 										placeholder="Enter Name"
// 									/>
// 								</div>
// 								<div className="form-group mt-3">
// 									<input
// 										type="email"
// 										className="form-control"
// 										id="exampleInputEmail1"
// 										aria-describedby="emailHelp"
// 										placeholder="Enter Country"
// 									/>
// 								</div>
// 								<div className="form-group mt-3">
// 									<input
// 										type="email"
// 										className="form-control"
// 										id="exampleInputEmail1"
// 										aria-describedby="emailHelp"
// 										placeholder="Enter City"
// 									/>
// 								</div>
// 								<div className="form-group mt-3">
// 									<input
// 										type="password"
// 										className="form-control"
// 										id="exampleInputPassword1"
// 										placeholder="Enter Country"
// 									/>
// 								</div>

// 								<button
// 									type="submit"
// 									className="btn btn-success mt-4"
// 								>
// 									Add Record
// 								</button>
// 							</form>
// 						</Modal.Body>

// 						<Modal.Footer>
// 							<Button variant="secondary" onClick={handleClose}>
// 								Close
// 							</Button>
// 						</Modal.Footer>
// 					</Modal>

// 					{/ Model Box Finsihs /}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default ManageUser;
