import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
// import {  toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getContact } from "../services/contact";
// import Swal from "sweetalert2";
import {
	CONTACT_EMAIL_RGX,
	CONTACT_NAME_RGX,
	CONTACT_PHONE_RGX,
} from "../Constant/Regex";
import Navbar from "./Navbar";

const regForEmail = CONTACT_EMAIL_RGX;
const regName = CONTACT_NAME_RGX;
const regPhone = CONTACT_PHONE_RGX;

export default function Contact() {
	const [fullname, setFullname] = useState("");
	const [pnum, setpnum] = useState("");
	const [email, setemail] = useState("");
	const [msg, setMsg] = useState("");
	const navigate = useNavigate();
	const successAlert = () => {
		Swal.fire({
			title: "Thank You! ,will get back to you soon",
			icon: "success",
		});
	};
	
	const [errors, setErrors] = useState({
		fullname: false,
		pnum: false,
		email: false,
		msg: false,
	});

	const form = useRef();

	// const failure = (data) =>
	// 	toast.error(data, { position: toast.POSITION.TOP_CENTER });

	const submitMsg = (e) => {
		e.preventDefault();

		// if (errors.fullname && errors.pnum && email !== "" && msg !== "") {
		const data = {
			fullName: fullname,
			phone: pnum,
			email: email,
			message: msg,
		};
		getContact(data)
			.then((res) => {
				// console.log(res.data);
				if (res.data.statusCode === 200) {
					emailjs
						.sendForm(
							"service_7agrfzd",
							"template_8ueaflm",
							form.current,
							"t0C36NteblDUpVhvX"
						)
						
						successAlert()
						navigate("/")
				}
			})
			
			.catch((res) => res.data.err);

		// else {
		// 	failure("Please Enter Valid Details !!");
		// }
	};

	return (
		<div className="mb-5">
			<Navbar />
			
			<div
				className="py-4 border-bottom text-center pb-4 text-white"
				style={{ background: "#b8565f" }}
			>
				<h1>Contact Us</h1>
			</div>

			<section>
				<div className="container mt-4 ">
					<div className="row">
						<div className="col-md-7 ">
							<h5 className="my-4">
								Please leave your concern here and we will get
								back to you asap!
							</h5>
						</div>
					</div>
				</div>
			</section>

			<form ref={form}>
				<section className="section ">
					<div className="container">
						<div className="card-shadow">
							<div className="card-body">
								<div className="row mt-3">
									<div className="col-md-6  text-black card bg-light">
										<h2
											className="text-center"
											style={{ color: "#b8565f" }}
										>
											{" "}
											Reach Out Us!{" "}
										</h2>
										<hr />

										<div className="form-group">
											<label
												htmlFor="checkbox-2"
												className="checkbox__label md-1"
											>
												Full Name
											</label>
											<input
												className="form-control"
												type="text"
												maxLength={30}
												placeholder="Enter your name"
												name="from_name"
												onChange={(event) => {
													setFullname(
														event.target.value
													);
													regName.test(fullname)
														? setErrors({
																...errors,
																fullname: true,
														  })
														: setErrors({
																...errors,
																fullname: false,
														  });
												}}
												required
											/>
											{fullname !== "" &&
												!regName.test(fullname) && (
													<span className="text-danger">
														{" "}
														Please Enter Valid Name{" "}
													</span>
												)}
										</div>

										<div className="form-group">
											<label
												htmlFor="checkbox-2"
												className="checkbox__label md-1"
											>
												{" "}
												Phone Number{" "}
											</label>
											<input
												className="form-control"
												type="text"
												maxLength="11"
												placeholder="Enter Your Phone Number"
												name="from_number"
												onChange={(event) => {
													setpnum(event.target.value);
													regPhone.test(pnum)
														? setErrors({
																...errors,
																pnum: true,
														  })
														: setErrors({
																...errors,
																pnum: false,
														  });
												}}
												required
											/>
											{pnum !== "" &&
												!regPhone.test(pnum) &&
												(pnum.length < 10 ||
													pnum.length > 10) && (
													<span className="text-danger">
														{" "}
														Phone Number Must Be At
														Least 10 Numbers{" "}
													</span>
												)}
										</div>

										<div className="form-group">
											<label
												htmlFor="checkbox-2"
												className="checkbox__label md-1"
											>
												{" "}
												Email Address{" "}
											</label>
											<input
												className="form-control"
												type="email"
												placeholder="Enter Your Email Adress"
												name="from_email"
												onChange={(event) => {
													setemail(
														event.target.value
													);
													regForEmail.test(email)
														? setErrors({
																...errors,
																email: true,
														  })
														: setErrors({
																...errors,
																email: false,
														  });
												}}
												required
											/>
											{email !== "" &&
												!regForEmail.test(email) && (
													<span className="text-danger">
														{" "}
														Please Enter valid
														E-mail id{" "}
													</span>
												)}
										</div>

										<div className="form-group">
											<label
												htmlFor="checkbox-2"
												className="checkbox__label md-1"
											>
												{" "}
												Message{" "}
											</label>
											<textarea
												rows="3"
												className="form-control"
												minLength={10}
												maxLength={100}
												placeholder="Type Your Message..."
												name="message"
												onChange={(event) => {
													setMsg(event.target.value);
												}}
												required
											>
												{" "}
											</textarea>
										</div>

										<div className="form-group text-center ">
											<button
												type="submit"
												value="Send"
												className="btn btn-success mt-0"
												style={{ width: "150px" }}
												onClick={submitMsg}
											>
												Send message
											</button>
										</div>
									</div>

									<div className="col-md-5 border-start mt-3 px-5">
										<h5 className="main-heading">
											Address Information :
										</h5>
										<div className="underline">
											<p>Pune Hinjewadi</p>

											<p>Phone no : 7877677688</p>

											<p>
												Email :
												mailto:neotrade@example.com
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</form>
		</div>
	);
}
