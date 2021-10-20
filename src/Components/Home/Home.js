import React from "react";
import Product from "../Product/Product";
import "./Home.css";

const Home = () => {
	return (
		<div className="home">
			<div className="home__container">
				<img
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/teaser1/GW/2_Desktop-Hero1x_1500x600._CB404635813_.jpg"
					alt=""
				/>
				<div className="home__row">
					<Product
						id="4903850"
						title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
						price={29.99}
						image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
						rating={5}
					/>
					<Product
						id="979875465"
						title="Aucma Stand Mixer,6.5-QT 660W 6-Speed Tilt-Head Food Mixer, Kitchen Electric Mixer with Dough Hook, Wire Whip & Beater (6.5QT, Blue)"
						price={239.0}
						image="https://images-na.ssl-images-amazon.com/images/I/61aT8jl8THL._AC_SL1001_.jpg"
						rating={4}
					/>
				</div>
				<div className="home__row">
					<Product
						id="46545984"
						title="Smart Watch,Health and Fitness Smartwatch with Heart Rate Blood Pressure SpO2 Monitor Sleep Tracker,Buletooth5.0,high-Definition Full-Screen Touch,IP68 Waterproof Smart Watch for Android iOS Phone"
						price={130.99}
						image="https://images-na.ssl-images-amazon.com/images/I/61b6XJARySL._AC_SL1200_.jpg"
						rating={3}
					/>
					<Product
						id="48798754"
						title="All-new Echo (4th Gen) | With premium sound, smart home hub, and Alexa | Charcoal"
						price={99.99}
						image="https://images-na.ssl-images-amazon.com/images/I/71JB6hM6Z6L._AC_SL1000_.jpg"
						rating={4}
					/>
					<Product
						id="135498465"
						title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Space Gray (4th Generation)"
						price={969}
						image="https://images-na.ssl-images-amazon.com/images/I/81SGb5l%2BlZL._AC_SL1500_.jpg"
						rating={5}
					/>
				</div>
				<div className="home__row">
					<Product
						id="28824655"
						title="Sceptre 85 Inch Curved UltraWide 21: 9 LED Creative Monitor QHD 3440x1440 Frameless AMD Freesync HDMI DisplayPort Up to 100Hz, Machine Black 2020 (C355W-3440UN)"
						price={1458.48}
						image="https://images-na.ssl-images-amazon.com/images/I/81H0w1E7j3L._AC_SL1500_.jpg"
						rating={4}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
