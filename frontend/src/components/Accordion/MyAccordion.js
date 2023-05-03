import React from "react";
import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";

function MyAccordion({ question, answer }) {
	return (
		<MDBContainer className="mt-2" style={{ maxWidth: "1000px" }}>
			<MDBAccordion alwaysOpen initialActive={1}>
				<MDBAccordionItem collapseId={1} headerTitle={question}>
					<h6>{answer}</h6>
				</MDBAccordionItem>
			</MDBAccordion>
		</MDBContainer>
	);
}
export default MyAccordion;
