import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebase";

const Header = () => {
	const [{ basket, user }, dispatch] = useStateValue();

	const handleAuthentication = () => {
		if (user) {
			auth.signOut();
		}
	};

	return (
		<div className="header">
			<Link to="/">
				<img
					className="header__logo"
					src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt="Amazon logo"
				/>
			</Link>
			<div className="header__search">
				<input className="header__searchInput" type="text" />
				<SearchIcon className="header__searchIcon" />
			</div>
			<div className="header__nav">
				<Link to={!user && "/login"}>
					<div onClick={handleAuthentication} className="header__navOption">
						<span className="header__navOption__lineOne">
							Hello, {user ? user.email : "Guest"}
						</span>
						<span className="header__navOption__lineTwo">
							{user ? "Sign Out" : "Sign In"}
						</span>
					</div>
				</Link>
				<Link to="/orders">
					<div className="header__navOption">
						<span className="header__navOption__lineOne">Returns</span>
						<span className="header__navOption__lineTwo">& Orders</span>
					</div>
				</Link>
				<div className="header__navOption">
					<span className="header__navOption__lineOne">Your</span>
					<span className="header__navOption__lineTwo">Prime</span>
				</div>
			</div>
			<Link to="/checkout">
				<div className="header__optionBasket">
					<ShoppingBasketIcon />
					<span className="header__navOption__lineTwo header__basketCount">
						{basket?.length}
					</span>
				</div>
			</Link>
		</div>
	);
};

export default Header;
