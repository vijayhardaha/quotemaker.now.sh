import { CURRENCIES } from "../lib/constants";

export const generateId = () => Math.random().toString(36).slice(2);

export const renderDropdown = (options) => {
	return options.map((i) => {
		return (
			<option key={i.id} value={i.id}>
				{i.name}
			</option>
		);
	});
};

export const getCurrency = (currency) =>
	CURRENCIES.filter((c) => c.id === currency).map((c) => c.value)[0];

export const nl2br = (text = "") =>
	text.split("\n").map((item, key) => {
		return (
			<span key={key}>
				{item}
				<br />
			</span>
		);
	});

export const int = (number = 0) => (number !== "" ? +parseInt(number, 10) : "");

export const float = (number = 0, limit = 2) =>
	number !== "" ? +parseFloat(number).toFixed(limit) : "";

export const decimal = (number = 0, limit = 2) =>
	number !== "" ? parseFloat(number).toFixed(limit) : "";

export const isNegative = (num) => Math.sign(num) < 0;

export const percent = (num = 0, per = 0) => float((num / 100) * per);

export const positive = (num) => Math.abs(num);

export const price = (currency, price = 0) => {
	const currencySymbol = getCurrency(currency);
	const negative = isNegative(price);
	const positivePrice = positive(price);
	const formattedPrice = `${currencySymbol}${decimal(positivePrice)}`;
	return negative ? `-${formattedPrice}` : formattedPrice;
};

export const isItemField = (e) => {
	const itemsClasses = [
		"itemName",
		"itemDescription",
		"itemQty",
		"itemCost",
		"itemTime",
		"itemAmount",
	];
	const reg = new RegExp(itemsClasses.join("|"), "i");
	return reg.test(e.target.className);
};

export const isFloatField = (e) => {
	const itemsClasses = ["floatField"];
	const reg = new RegExp(itemsClasses.join("|"), "i");
	return reg.test(e.target.className);
};

export const isIntField = (e) => {
	const itemsClasses = ["intField"];
	const reg = new RegExp(itemsClasses.join("|"), "i");
	return reg.test(e.target.className);
};

export const isCheckboxField = (e) => {
	const itemsClasses = ["checkboxField"];
	const reg = new RegExp(itemsClasses.join("|"), "i");
	return reg.test(e.target.className);
};

export const validateInput = (e) => {
	let value = e.target.value;
	if (value !== "") {
		if (isFloatField(e)) {
			value = float(value);
		} else if (isIntField(e)) {
			value = int(value);
		} else {
			value = value.toString();
		}
	}
	return value;
};

export const filterClasses = ({
	type,
	description,
	time,
	discount,
	vat,
	custom,
}) => {
	let classes = [];
	if (type === "quantity") {
		classes.push("has-qty");
	}
	if (description) {
		classes.push("has-description");
	}
	if (time) {
		classes.push("has-time");
	}
	if (discount) {
		classes.push("has-discount");
	}
	if (vat) {
		classes.push("has-vat");
	}
	if (custom) {
		classes.push("has-custom");
	}
	return classes.join(" ");
};
