/**
 * Package dependancies
 */
import { useState, useEffect, useReducer, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { GrVmware } from "react-icons/gr";
import { FiScissors } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

/**
 * Local dependancies
 */
import { DEFAULT_DATA } from "../../lib/constants";
import FilterBox from "./filters";
import Title from "./title";
import Description from "./description";
import Terms from "./terms";
import Notes from "./notes";
import Items from "./items";
import Summary from "./summary";
import Modal from "./modal";
import Preview from "../preview/preview";
import { int, float, percent, isNumber } from "../../lib/util";

/**
 * Main Component
 */
const Builder = () => {
	const [
		{
			hourly,
			currency,
			discount,
			vat,
			customCost,
			title,
			desc,
			terms,
			notes,
			items,
			discountAmt,
			discountType,
			discountTotal,
			customCostLabel,
			customCostAmt,
			vatAmt,
			vatTotal,
			subtotal,
			total,
		},
		setData,
	] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		DEFAULT_DATA
	);

	const [modalOpen, modalToggle] = useState(false);

	const [preview, setPreview] = useState(false);

	const [load, setLoad] = useState(false);

	const calculate = () => {
		// Sub total
		const s = items
			.map((item) => item.total)
			.reduce((a, b) => float(a) + float(b), 0);
		// VatTotal
		let v = 0;
		// Discount Total
		let d = 0;
		// Custom Cost Total
		let c = 0;

		setData({ subtotal: s });

		if (vat && isNumber(vatAmt) && vatAmt > 0) {
			v = percent(subtotal, vatAmt);
			setData({ vatTotal: v });
		}

		if (customCost && isNumber(customCostAmt)) {
			c = float(customCostAmt);
			setData({ customCostAmt: c });
		}

		if (discount && isNumber(discountAmt)) {
			d = discountType === "1" ? discountAmt : percent(subtotal, discountAmt);

			setData({ discountTotal: d });
		}

		const t = +s + +v - +d + +c;
		setData({ total: t });
	};

	const resetForm = () => {
		setData(DEFAULT_DATA);
	};

	const Mobile = ({ children }) => {
		const isMobile = useMediaQuery({ maxWidth: 767 });
		return isMobile ? children : null;
	};

	const Default = ({ children }) => {
		const isNotMobile = useMediaQuery({ minWidth: 768 });
		return isNotMobile ? children : null;
	};

	useEffect(() => {
		calculate();
	}, [
		discount,
		vat,
		customCost,
		items,
		discountAmt,
		discountType,
		customCostAmt,
		vatAmt,
	]);

	// Set focus on the dynamic input field
	useEffect(() => {
		if (load) {
			if (items[items.length - 1].iref) {
				items[items.length - 1].iref.focus();
			}
		} else {
			setLoad(true);
		}
	}, [items.length]);

	return (
		<>
			{preview ? (
				<Default>
					<Preview
						closePreview={setPreview}
						hourly={hourly}
						currency={currency}
						discount={discount}
						vat={vat}
						customCost={customCost}
						title={title}
						desc={desc}
						terms={terms}
						notes={notes}
						items={items}
						discountAmt={discountAmt}
						discountType={discountType}
						customCostLabel={customCostLabel}
						customCostAmt={customCostAmt}
						vatAmt={vatAmt}
						subtotal={subtotal}
						discountTotal={discountTotal}
						vatTotal={vatTotal}
						total={total}
					/>
				</Default>
			) : (
				<Form onSubmit={(e) => e.preventDefault()}>
					<FilterBox
						currency={currency}
						customCost={customCost}
						discount={discount}
						hourly={hourly}
						vat={vat}
						setData={setData}
					/>

					<Title value={title} setData={setData} />

					<Description value={desc} setData={setData} />

					<Items hourly={hourly} items={items} setData={setData} />

					<Summary
						currency={currency}
						discount={discount}
						vat={vat}
						customCost={customCost}
						subtotal={subtotal}
						discountAmt={discountAmt}
						discountType={discountType}
						discountTotal={discountTotal}
						vatAmt={vatAmt}
						vatTotal={vatTotal}
						customCostLabel={customCostLabel}
						customCostAmt={customCostAmt}
						total={total}
						setData={setData}
					/>

					<Terms value={terms} setData={setData} />

					<Notes value={notes} setData={setData} />

					<Form.Group controlId="form-actions" className="form-actions">
						<Button variant="primary" onClick={() => setPreview(true)}>
							<GrVmware />
							Generate Preview
						</Button>
						<Button variant="secondary" onClick={() => modalToggle(true)}>
							<FiScissors />
							Clear Data
						</Button>
					</Form.Group>

					{modalOpen && <Modal resetForm={resetForm} showModal={modalToggle} />}
				</Form>
			)}
			<Mobile>
				<div className="bg-primary text-white p-3 mb-5 rounded">
					<p className="mb-0">
						This tool does not support preview on small screen. Please use a
						device with big screen to see the previews.
					</p>
				</div>
				{preview && (
					<Button variant="secondary" onClick={() => setPreview(false)}>
						Go Back
					</Button>
				)}
			</Mobile>
		</>
	);
};

// Default Export
export default Builder;
