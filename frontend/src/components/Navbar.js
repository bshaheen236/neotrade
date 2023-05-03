import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ColorSchemesExample() {
	return (
		<div className="Tabs">
			<Navbar bg="light" expand="lg">
				<Container fluid>
					<Navbar.Brand href="#home">
						<img src="images/logo.png" alt="img" />
						<span style={{ color: "Black" }}>Neo</span>
						<span style={{ color: "#DAA520" }}>TRADE</span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse
						className="justify-content-end"
						id="basic-navbar-nav"
					>
						<Nav className="">
							<Nav.Link as={Link} to="/">
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/about">
								About
							</Nav.Link>
							<Nav.Link as={Link} to="/FAQ">
								FAQs
							</Nav.Link>
							<Nav.Link as={Link} to="/Aboutgns">
								AboutG&S
							</Nav.Link>
							<Nav.Link as={Link} to="/contact">
								Contact Us
							</Nav.Link>
						</Nav>

						<Button
							className="text-white "
							size="sm"
							variant="primary"
						>
							{" "}
							<Nav.Link as={Link} to="/login">
								Login
							</Nav.Link>
						</Button>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default ColorSchemesExample;
