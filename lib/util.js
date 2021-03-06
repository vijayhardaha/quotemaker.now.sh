import { CURRENCIES } from "./constants";

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

export const int = (num = 0, default_return = "") =>
	isEmpty(num) ? default_return : +parseInt(num, 10);

export const float = (num = 0, default_return = "", limit = 2) =>
	isEmpty(num) ? default_return : +parseFloat(num).toFixed(limit);

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

export const isNumber = (num) => !isNaN(parseFloat(num)) && isFinite(num);

export const isEmpty = (string) =>
	typeof string === "undefined" || string === "" || string === null
		? true
		: false;

export const validateQty = (num) =>
	isEmpty(num) || (isNumber(num) && int(num) > 0) ? true : false;

export const validatePrice = (num, negative = false) =>
	isEmpty(num) || (negative && num === "-")
		? true
		: isNumber(num)
		? negative
			? true
			: float(num) >= 0
			? true
			: false
		: false;

export const priceCheck = (num, negativeIgnore = false) =>
	isNumber(num) ? (negativeIgnore ? float(num) : num > 0 ? float(num) : 0) : 0;

export const zeroPad = (num, places) => String(num).padStart(places, "0");
