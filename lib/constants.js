export const CURRENCIES = [
	{ id: "USD", value: "$", name: "USD - US Dollars" },
	{ id: "AUD", value: "$", name: "AUD - Australian Dollars" },
	{ id: "GBP", value: "£", name: "GBP - British Pounds" },
	{ id: "EUR", value: "€", name: "EUR - Euro" },
	{ id: "INR", value: "₹", name: "INR - Indian Rupees" },
	{ id: "BRL", value: "R$", name: "BRL - Brazilian Reals" },
	{ id: "CAD", value: "$", name: "CAD - Canadian Dollars" },
	{ id: "HKD", value: "$", name: "HKD - Hong Kong Dollars" },
	{ id: "ILS", value: "₪", name: "ILS - Israeli New Shekels" },
	{ id: "JPY", value: "¥", name: "JPY - Japanese Yen" },
	{ id: "MXN", value: "$", name: "MXN - Mexican Pesos" },
	{ id: "TWD", value: "NT$", name: "TWD - New Taiwan Dollars" },
	{ id: "NZD", value: "$", name: "NZD - New Zealand Dollars" },
	{ id: "PHP", value: "P", name: "PHP - Philippine Pesos" },
	{ id: "SGD", value: "$", name: "SGD - Singapore Dollars" },
	{ id: "THB", value: "฿", name: "THB - Thai Baht" },
	{ id: "KES", value: "Ksh", name: "KES - Kenyan Shilling" },
	{ id: "NGN", value: "₦", name: "NGN - Nigerian Naira" },
];

export const TABLE_TYPES = [
	{ id: "fixed", name: "Fixed Cost" },
	{ id: "hourly", name: "Hourly Cost" },
];

export const CHECKBOX_SVG = (
	<svg viewBox="0 0 21 21">
		<path d="M5 10.75l3.5 3.5L19.4 2.3C18.833 1.433 18.033 1 17 1H4C2.35 1 1 2.35 1 4v13c0 1.65 1.35 3 3 3h13c1.65 0 3-1.35 3-3V7.998"></path>
	</svg>
);

export const DEFAULT_FORM_DATA = {
	tableType: "amount",
	currency: "GBP",
	enableDescription: false,
	enableTime: false,
	enableDiscount: false,
	enableVat: false,
	enableCustomCost: false,
	projectTitle: "",
	projectDescription: "",
	terms: "",
	notes: "",
	items: [{ name: "", description: "", qty: 1, time: 0, cost: 0, amount: 0 }],
	discountAmount: 0,
	discountType: 0,
	customCostLabel: "Other",
	customCostAmount: 0,
	vatAmount: 0,
	subtotal: 0,
	discount: 0,
	customCost: 0,
	vat: 0,
	totalCost: 0,
	totalTime: 0,
	preview: false,
};

export const DEFAULT_DATA = {
	hourly: false,
	currency: "GBP",
	discount: false,
	vat: false,
	customCost: false,
	title: "",
	desc: "",
	terms: "",
	notes: "",
	items: [{ title: "", qty: 1, price: 0, total: 0 }],
	discountAmt: 0,
	discountType: 0,
	customCostLabel: "Other",
	customCostAmt: 0,
	vatAmt: 0,
	subtotal: 0,
	discountTotal: 0,
	vatTotal: 0,
	total: 0,
};
