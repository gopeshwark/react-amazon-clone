import React from "react";
import "./BasketItem.css";
import { useStateValue } from "../../StateProvider";

const BasketItem = ({ id, title, image, price, rating, hideButton }) => {
	const [{ basket }, dispatch] = useStateValue();

	const removeFromBasket = () => {
		// remove the item from the basket
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id: id,
		});
	};

	return (
		<div className="basketItem">
			<div>
				<img className="basketItem__image" src={image} alt={image} />
			</div>
			<div className="basketItem__info">
				<p className="basketItem__title">{title}</p>
				<p className="basketItem__price">
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className="basketItem__rating">
					{Array(rating)
						.fill()
						.map(() => (
							<p>⭐</p>
						))}
				</div>
				{!hideButton && (
					<button onClick={removeFromBasket}>Remove from Basket</button>
				)}
			</div>
		</div>
	);
};

export default BasketItem;
