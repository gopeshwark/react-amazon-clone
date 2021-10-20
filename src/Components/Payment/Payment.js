import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "../../StateProvider";
import BasketItem from "../BasketItem/BasketItem";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import axios from "../../axios";
import { db } from "../../firebase";

const Payment = () => {
	const [{ basket, user }, dispatch] = useStateValue();
	const history = useHistory();

	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		// generate the special stripe secret which allows us to charge a customer
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				// Stripe expects the total in a currencies sub-units (ex. rupees into paise or dollars into cents)
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
			console.log("THE SECRET IS >>>", response.data);
		};

		getClientSecret();
	}, [basket]);

	const handleSubmit = async (event) => {
		// do all the fancy stripe stuff...
		event.preventDefault();
		setProcessing(true);

		await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then((response) => {
				// paymentIntent = payment confirmation
				if (response.error) {
					// Handle error here
					console.log(response.error);
				} else if (
					response.paymentIntent &&
					response.paymentIntent.status === "succeeded"
				) {
					// Handle successful payment here
					db.collection("users")
						.doc(user?.uid)
						.collection("orders")
						.doc(response.paymentIntent.id)
						.set({
							basket: basket,
							amount: response.paymentIntent.amount,
							created: response.paymentIntent.created,
						});

					setSucceeded(true);
					setError(null);
					setProcessing(false);

					dispatch({
						type: "EMPTY_BASKET",
					});

					history.replace("/orders");
				}
			});
	};

	const handleChange = (e) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>
					Checkout (<Link to="/checkout">{basket?.length} items</Link>)
				</h1>

				{/* Payment section - delivery address */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Los Angeles, CA</p>
					</div>
				</div>

				{/* Payment section - Review Items */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Review items and delivery</h3>
					</div>
					<div className="payment__items">
						{basket.map((item) => (
							<BasketItem
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>

				{/* Payment section - Payment method */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment__details">
						<form onSubmit={handleSubmit}>
							<CardElement
								className="payment__cardElement"
								onChange={handleChange}
							/>
							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={(value) => <h3>Order Total: {value}</h3>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
								</button>
							</div>

							{/* Errors */}
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
