import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Wallet from "./components/Wallet";
import FAQ from "./components/Accordion/FAQ";
import Aboutgns from "./components/Aboutgns";
import Myprofile from "./components/Myprofile";
import Sidenav from "./components/Sidenav";
import Passreset from "./components/Passreset";
import Forgotpass from "./components/Forgotpass";
import GoldNewCart from "./components/GoldNewCart";
import BankDetails from "./components/BankDetails";
import RightSide from "./components/RightSide";
import WalletTransaction from "./components/WalletTransaction";
import TradingInvoice from "./components/TradingInvoice";
import Orderhistory from "./components/Orderhistory";
import ManageUser from "./components/ManageUser";
import Details from "./components/Details";
import Portfolio from "./components/Portfolio";
import EditProduct from "./components/EditProduct";
import Notification from "./components/Notification"
import AccountReport from "./components/AccountReport";
import WalletReport from "./components/WalletReport";
import Sell from "./components/Sell";
import Cart from "./components/Cart";
import Buy from "./components/Buy";
import Kyc from "./components/Kyc";
import { isLoggedIn, isAdmin } from "./services/loginUser";
import "./App.css";

function ProtectRoute({ children }) {
	const auth = isLoggedIn();
	return auth ? children : <Navigate to="/login" />;
}
function ProtectAdminRoute({ children }) {
	const auth = isLoggedIn();
	const adminauth = isAdmin();
	return auth && adminauth ? children : <Navigate to="/" />;
}

function App() {
	return (
		<div className="">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/FAQ" element={<FAQ />} />
					<Route path="/aboutgns" element={<Aboutgns />} />
					<Route
						path="/forgotpassword/:id/:token"
						element={<Forgotpass />}
					/>
					<Route path="/passreset" element={<Passreset />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/g" element={<GoldNewCart />} />
					<Route
						path="/dashboard"
						element={
							<ProtectRoute>
								<Dashboard />
							</ProtectRoute>
						}
					/>
					<Route
						path="/manageuser"
						element={
							<ProtectAdminRoute>
								<ManageUser />
							</ProtectAdminRoute>
						}
					/>
					<Route
						path="/accountreport"
						element={
							<ProtectAdminRoute>
								<AccountReport />
							</ProtectAdminRoute>
						}
					/>
					<Route
						path="/walletreport"
						element={
							<ProtectAdminRoute>
								<WalletReport />
							</ProtectAdminRoute>
						}
					/>
					<Route
						path="/editproduct"
						element={
							<ProtectAdminRoute>
								<EditProduct />
							</ProtectAdminRoute>
						}
					/>

					<Route
						path="/view/:id"
						element={
							<ProtectAdminRoute>
								<Details />
							</ProtectAdminRoute>
						}
					/>
					<Route
						path="/sidenav"
						element={
							<ProtectRoute>
								<Sidenav />
							</ProtectRoute>
						}
					/>
					<Route
						path="/portfolio"
						element={
							<ProtectRoute>
								<Portfolio />
							</ProtectRoute>
						}
					/>
					<Route
						path="/orderhistory"
						element={
							<ProtectRoute>
								<Orderhistory />
							</ProtectRoute>
						}
					/>

					<Route
						path="/rightSide"
						element={
							<ProtectRoute>
								<RightSide />
							</ProtectRoute>
						}
					/>
					<Route
						path="/cart"
						count="cartItemCount"
						element={
							<ProtectRoute>
								<Cart />
							</ProtectRoute>
						}
					/>

					<Route
						path="/wallet"
						element={
							<ProtectRoute>
								<Wallet />
							</ProtectRoute>
						}
					/>

					<Route
						path="/myprofile"
						element={
							<ProtectRoute>
								<Myprofile />
							</ProtectRoute>
						}
					/>
					<Route
						path="/bankdetails"
						element={
							// <ProtectRoute>
							<BankDetails />
							// </ProtectRoute>
						}
					/>

					<Route
						path="/sell"
						element={
							<ProtectRoute>
								<Sell />
							</ProtectRoute>
						}
					/>
					<Route
						path="/buy"
						element={
							<ProtectRoute>
								<Buy />
							</ProtectRoute>
						}
					/>
					<Route
						path="/kyc"
						element={
							<ProtectRoute>
								<Kyc />
							</ProtectRoute>
						}
					/>
					<Route
						path="/tradinginvoice"
						element={
							<ProtectAdminRoute>
								<TradingInvoice />
							</ProtectAdminRoute>
						}
					/>
					<Route
						path="/transaction"
						element={
							// <ProtectRoute>
							<WalletTransaction />
							// </ProtectRoute>
						}
					/>
					<Route
						path="/orderhistory"
						element={
							<ProtectRoute>
								<Orderhistory />
							</ProtectRoute>
						}
					/>
					<Route
						path="/Notification"
						element={
							<ProtectRoute>
								<Notification />
							</ProtectRoute>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
