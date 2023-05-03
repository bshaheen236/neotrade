import React, { useState } from "react";

import { MDBContainer } from "mdb-react-ui-kit";
import Navbar from "../Navbar";
import questions from "./api.json";
import MyAccordion from "./MyAccordion";

function FAQ() {
	const [data] = useState(questions);
	return (
		<div>
			<Navbar />
			<MDBContainer
				className="mt-5"
				style={{ maxWidth: "1000px", color: "#b8565f" }}
			>
				<h3 className="faq text-center">FAQs</h3>
				<p className="text-center mb-5">
					Find the answers for the most frequently asked questions
					below
				</p>
				{data.map((curElem) => {
					const { id } = curElem;
					return <MyAccordion key={id} {...curElem} />;
				})}
			</MDBContainer>
		</div>
	);
}
export default FAQ;
