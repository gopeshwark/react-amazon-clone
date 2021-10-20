const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51HX9vmARPDkZMw5fqSpKbBzLg30P5ziS7fA1FturxoZc7WAz7AZkyiKGTBa1dWNYIAKXFmTJTfLhUFTHUtnHXDZS00FlnjYMOf"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
	const total = request.query.total;

	console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, // sub-units of the currency
		currency: "inr",
	});

	// OK - Created
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

// - Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/react--clone-182b9/us-central1/api

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
