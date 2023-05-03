import * as React from "react";
import { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
// import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
// import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
// import TextField from "@material-ui/core/TextField";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink, Link } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
import { CDBSidebarMenu, CDBSidebarMenuItem, CDBSidebarHeader } from "cdbreact";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { Avatar } from "@mui/material";

import { doLogout, isAdmin } from "../services/loginUser";
// import { isAdmin } from "../services/loginUser";
import { getUserById } from "../services/user";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function Sidenav() {
	const admin = isAdmin();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const count = localStorage.getItem("count");
	const [pic, setPic] = React.useState(null);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		// const user = JSON.parse(localStorage.getItem("userInfo"));
		const id1 = localStorage.getItem("id");

		getUserById(id1).then((res) => {
			localStorage.setItem(id1, res.data.data);

			// localStorage.setItem("userInfo", JSON.stringify(res.data));
			setPic(res.data.data.imagePath);
		});
	}, [pic]);

	return (
		<>
			<AppBar
				position="absolute"
				open={open}
				style={{
					backgroundColor: "whiteSmoke",
					border: "none",
					outline: "",
					boxShadow: "none",
					height: "76px",
				}}
			>
				<Toolbar
					sx={{
						pr: "24px", // keep right padding when drawer closed
					}}
				>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						sx={{
							marginRight: "36px",
							...(open && {
								display: "none",
								borderRight: "10px",
							}),
						}}
					>
						<i className="fa fa-bars fa-large text-dark" />
					</IconButton>

					<Typography
						component="h1"
						variant="h6"
						color="dark"
						noWrap
						sx={{ flexGrow: 1 }}
					>
						<Nav className="me-auto" />
						<Navbar.Brand
							as={Link}
							to="/dashboard"
							style={{ marginLeft: "" }}
						>
							<img
								src="images/logo.png"
								alt="img"
								height="40px"
							/>
							<span style={{ color: "Black" }}>Neo</span>
							<span style={{ color: "#DAA520" }}>TRADE</span>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
					</Typography>

				<NavLink
						exact
						to="/cart"
						title="cart"
						className="text-secondary "
					>
						<CDBSidebarMenuItem className="w-100">
							<div className="">
								<Badge
									badgeContent={count}
									color="warning"
									style={{ marginTop: "10px" }}
								>
									<i className="fa-solid fa-cart-shopping" />
								</Badge>
							</div>
						</CDBSidebarMenuItem>
					</NavLink>
					<div>
						<section
							className=""
							style={{ marginRight: "", color: "black" }}
						>
							<div className="dropdown">
								<Dropdown>
									<Dropdown.Toggle
										style={{
											backgroundColor: "whiteSmoke",
											border: "none",
										}}
									>
										<Avatar className="mt-0" src={pic} />
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item
											as={Link}
											to="/myprofile"
										>
											<i
												className="fa fa-user"
												aria-hidden="true"
											/>
											&nbsp;&nbsp; Profile
										</Dropdown.Item>

										<Dropdown.Item
											as={Link}
											to="/"
											onClick={() =>
												doLogout(
													localStorage.getItem("id"),
													localStorage.getItem(
														"token"
													)
												)
											}
										>
											<i
												className="fa fa-lock"
												aria-hidden="true"
											/>
											&nbsp;&nbsp; Logout
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</section>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader style={{ backgroundColor: "" }}>
					<CDBSidebarHeader>
						<NavLink
							exact
							to="/dashboard"
							className="text-decoration-none"
							style={{ color: "black" }}
						>
							Dashboard
						</NavLink>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</CDBSidebarHeader>
				</DrawerHeader>
				<Divider />
				<List>
					<CDBSidebarMenu>
						{/* admin content */}
						{admin ? (
							<>
								<NavLink
									exact
									to="/manageuser"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										{" "}
										<i
											className="fa fa-user"
											aria-hidden="true"
										/>
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Manage User
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									exact
									to="/trasaction"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										{" "}
										<i
											className="fa-solid fa-arrows-spin"
											aria-hidden="true"
										/>
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Transaction
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									exact
									to="/tradinginvoice"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										{" "}
										<i
											className="fa-solid fa-file-lines"
											aria-hidden="true"
										/>
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Trading Invoice
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									exact
									to="/editproduct"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										<i className="fa-brands fa-sellcast" />

										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
												color: "black",
											}}
										>
											EditProduct
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									exact
									to="/accountreport"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										{" "}
									
										<i className="fa fa-file-pdf-o"/>
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Accounting Report
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									exact
									to="/walletreport"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										{" "}
									
										<i className="fa fa-file-word-o"/>
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Wallet Report
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									exact
									to="/notification"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										{" "}
										<i
											className="fa-solid fa-rectangle-list"
											aria-hidden="true"
										/>
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Notification
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									exact
									to="/kycreq"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										<i
											className="fa-solid fa-circle-check"
											aria-hidden="true"
										/>
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											KYC Approval
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
							</>
						) : (
							<>
								{/* user content */}

								<NavLink
									exact
									to="/portfolio"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										{" "}
										<i
											className="fa fa-address-card"
											aria-hidden="true"
										/>
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Portfolio
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>

								<NavLink
									exact
									to="/sell"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										<i className="fa-brands fa-sellcast" />

										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
												color: "black",
											}}
										>
											Sell
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>

								<NavLink
									exact
									to="/buy"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										<i className="fa-brands fa-sellcast" />
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
												color: "black",
											}}
										>
											Buy
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>

								<NavLink
									exact
									to="/wallet"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										<i className="fa fa-wallet" />
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Wallet
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									exact
									to="/bankdetails"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										<i className="fa-sharp fa-solid fa-building-columns" />
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Bank Details
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									exact
									to="/transaction"
									className="text-dark"
								>
									<CDBSidebarMenuItem>
										<i className="fa-solid fa-tent-arrow-left-right" />
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Transaction
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>

								<NavLink
									exact
									to="/orderhistory"
									className="text-dark"
								>
									<CDBSidebarMenuItem>
										<i className="fa-solid fa-paste" />
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Order history
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>

								<NavLink
									exact
									to="/kyc"
									className="text-dark"
									activeClassName="activeClicked"
								>
									<CDBSidebarMenuItem>
										{" "}
										<i
											className="fa fa-address-card"
											aria-hidden="true"
										/>
										<samp
											className="px-4"
											style={{
												fontFamily:
													"Arial, Helvetica, sans-serif",
											}}
										>
											Kyc
										</samp>
									</CDBSidebarMenuItem>
								</NavLink>
							</>
						)}
					</CDBSidebarMenu>
				</List>

				<Divider />
			</Drawer>
		</>
	);

}
