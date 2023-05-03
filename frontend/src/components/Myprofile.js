import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { storage } from "./googleSignin/config";
import { getUserById, editUser } from "../services/user";
import "../Myprofile.css";
import Sidenav from "./Sidenav";

export default function Myprofile() {
	const [state, setState] = useState("");
	const [allowEdit, setAllowedEdit] = useState(false);
	const [fName, setFName] = useState("");
	const [lName, setLName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [image, setImage] = useState("");
	const [pic, setPic] = useState(null);

	const userInfo = localStorage.getItem("userInfo");

	const successAlert = () => {
		Swal.fire({
			title: "Profile update successfully",
			icon: "success",
		});
	};

	const getUserINFO = (id) => {
		getUserById(id).then((res) => {
			localStorage.setItem(id, res.data.data);
			localStorage.setItem("userInfo", JSON.stringify(res.data));
			setPic(res.data.data.imagePath);
			setState(res.data.data);
		});
	};

	const handleImageChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setImage(e.target.files[0]);
		}
	};

	const handleSubmit = () => {
		const info = JSON.parse(userInfo);

		const imageRef = ref(storage, `profile/${fName}${lName}`);

		uploadBytes(imageRef, image).then(() => {
			getDownloadURL(imageRef).then((pic) => {
				editUser(info.data._id, {
					fname: fName,
					lname: lName,
					email: email,
					phone: phone,
					prourl: pic,
				}).then(() => {
					getUserINFO(info.data._id);
					setPic(pic);
					localStorage.setItem("pic", pic);
				});
			});

			setImage(null);
		});
	};

	const today = new Date(state.createdAt);
	const date1 = today.getDate();
	const month = parseInt(today.getMonth() + 1);
	const year = today.getFullYear();
	const date = `${date1}/${month}/${year}`;

	useEffect(() => {
		const info = JSON.parse(userInfo);
		setFName(info.data.fname);
		setLName(info.data.lname);
		setEmail(info.data.email);
		setPhone(info.data.phone);
		getUserINFO(info.data._id);
	}, []);
	const updateProfile = () => {
		const info = JSON.parse(userInfo);
		editUser(info.data._id, {
			fname: fName,
			lname: lName,
			email: email,
			phone: phone,
		}).then(() => {
			getUserINFO(info.data._id);
		});
	};

	return (
		<div>
			<Sidenav />
			<div className="container">
				<div className="main-body ">
					<div className="row">
						<div className="  col-md-4">
							<div className="card pro-img">
								<div className="card-body">
									<div className="d-flex flex-column align-items-center text-center ">
										<div className="avatar-wrapper">
											<img
												className="profile-pic"
												alt="."
												src={pic}
											/>
											<div className="upload-button">
												<div className="image-upload">
													<label htmlFor="file-input">
														<i className="fa fa-arrow-circle-up mt-0" />
													</label>

													<input
														id="file-input"
														type="file"
														onChange={
															handleImageChange
														}
													/>
												</div>
											</div>
										</div>
										<div className="fill text-center">
											<button
												className="btn btn-outline-success border-dark w-100 "
												type="button"
												onClick={handleSubmit}
											>
												Upload
											</button>
										</div>

										<div className="mt-1">
											<p>
												<strong>
													{fName} {lName}
												</strong>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<div className="card pro-img1">
								<div className="card-body">
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-1">Full Name</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input
												className="input2 form-control"
												value={fName}
												disabled={!allowEdit}
												onChange={(e) => {
													setFName(e.target.value);
												}}
											/>
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Last Name</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input
												className="input2 form-control"
												type="text"
												value={lName}
												onChange={(e) => {
													setLName(e.target.value);
												}}
												disabled={!allowEdit}
											/>
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Phone</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input
												className="input2 form-control"
												type="text"
												value={phone}
												onChange={(e) => {
													setPhone(e.target.value);
												}}
												disabled={!allowEdit}
											/>
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Email</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input
												className="input2 form-control"
												type="text"
												value={email}
												onChange={(e) => {
													setEmail(e.target.value);
												}}
												disabled={!allowEdit}
											/>
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Date</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input
												className="input2  form-control"
												type="text"
												value={date}
												disabled
											/>
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-9 text-center ">
											{!allowEdit ? (
												<button
													type="button"
													className="btn border-dark  text-white w-20 "
													style={{
														backgroundColor:
															"#b8565f",
													}}
													onClick={() => {
														setAllowedEdit(true);
													}}
												>
													Edit Profile
												</button>
											) : (
												<button
													type="button"
													className="btn border-dark  text-white"
													style={{
														backgroundColor:
															"#b8565f",
														width: "100px",
													}}
													onClick={() => {
														updateProfile();
														successAlert();
														setAllowedEdit(false);
													}}
												>
													Save
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
