import React from "react";
import RightSide from "./RightSide";
import Sidenav from "./Sidenav";

export default function Dashboard() {
	return (
		<div>
			{/* <NavbarD /> */}
			<Sidenav />
			<RightSide />
		</div>
	);
}
