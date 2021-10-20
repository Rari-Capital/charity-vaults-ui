import React, { useState } from 'react'
import Page from "../Page/Page"
import Button from "../Button/Button"
import Input from "../Input/Input"
import Modal from "../Modal/Modal"
import InputHeader from "../Input/InputHeader"
import Toggle from "react-toggle";
import { useLocation } from "react-router-dom";
import "react-toggle/style.css"
import "./Deposit.css"

const charityOptions = {
	"Charity 1": "Charity 1",
	"Charity 2": "Charity 2",
	"Charity 3": "Charity 3"
}

const interestRateOptions = {
	"5": "5%",
	"10": "10%",
	"15": "15%",
	"20": "20%",
	"25": "25%"
}

const currencyOptions = {
	"BTC": "Bitcoin",
	"ETH": "Ethereum",
	"USDT": "USD Token",
}

const Deposit = () => {
	const [showCustomFields, setShowCustomFields] = useState(false);

	// Pre-select fields
	const [charityName, setCharityName] = useState("invalid");
	const [interestRate, setInterestRate] = useState("invalid");

	// Custom fields
	const [charityAddress, setCharityAddress] = useState(null);
	const [customInterestRate, setCustomInterestRate] = useState(null);

	// These fields always
	const [currency, setCurrency] = useState("invalid");
	const [depositAmount, setDepositAmount] = useState(null);

	const [showDepositModal, setShowDepositModal] = useState(false);
	const [depositModalMessage, setDepositModalMessage] = useState(null)

	const doDeposit = () => {
		let depositMessage;
		let errorOccurred = false
		if (showCustomFields) {
			if (!charityAddress) {
				depositMessage = "Must provide a charity wallet address.";
				errorOccurred = true;
			} else if (!customInterestRate || customInterestRate <= 0 || customInterestRate >= 100) {
				depositMessage = "Must provide a valid gift rate.";
				errorOccurred = true;
			}
		} else {
			if (!charityName || charityName === "invalid") {
				depositMessage = "Must select a charity.";
				errorOccurred = true;
			} else if (!interestRate || interestRate === "invalid") {
				depositMessage = "Must select a gift rate.";
				errorOccurred = true;
			}
		}

		if (!errorOccurred) {
			if (!currency || currency === "invalid") {
				errorOccurred = true;
				depositMessage = "Must select a currency.";
			} else if (!depositAmount || depositAmount <= 0) {
				errorOccurred = true;
				depositMessage = "Must provide valid deposit amount.";
			}
		}

		if (!errorOccurred) {
			// Do deposit stuff here eventually
			depositMessage = `Successful deposit!`
		}

		setDepositModalMessage(depositMessage);
		setShowDepositModal(true);
	}

	const doReset = () => {
		setCharityName("invalid");
		setCharityAddress("");
		setCustomInterestRate("");
		setInterestRate("invalid");
		setCurrency("invalid");
		setDepositAmount("");
	}

	// useEffect(() => {
	// 	const search = useLocation().search;
	// 	const address = new URLSearchParams(search).get('address');
	// 	const rate = new URLSearchParams(search).get('rate');
	// 	const name = new URLSearchParams(search).get('name');
	// 	if (address) {

	// 	}
	// }, []);

	let charityFields;
	if (showCustomFields) {
		charityFields = <>
			<InputHeader value="ENTER CUSTOM CHARITY ADDRESS" />
			<div className="large-input-container">
				<Input value={charityAddress}
					onChange={(event) => { setCharityAddress(event.target.value) }}
					type="text" placeholder="XXXXXXXXXXXXXXXXX" />

			</div>
			<InputHeader value="ENTER CUSTOM GIFT RATE (%)" />
			<div className="large-input-container">
				<Input value={customInterestRate}
					onChange={(event) => { setCustomInterestRate(event.target.value) }}
					type="number" placeholder="XX%" />
			</div>
		</>;
	} else {
		charityFields = <>
			<InputHeader value="SELECT CHARITY" />
			<select id="selectCharity" value={charityName}
				onChange={(event) => setCharityName(event.target.value)}
				className="dropdown-container">
				<option value="invalid">N/A</option>
				{Object.keys(charityOptions).map(key => (
					<option value={key}>{charityOptions[key]}</option>
				))}
			</select>
			<InputHeader value="SELECT GIFT RATE" />
			<div>
				<select id="selectInterest" value={interestRate}
					onChange={(event) => setInterestRate(event.target.value)}
					className="dropdown-container">
					<option value="invalid">N/A</option>
					{Object.keys(interestRateOptions).map(key => (
						<option value={key}>{interestRateOptions[key]}</option>
					))}
				</select>
			</div>
		</>;
	}

	return (
		<Page>
			<div className="deposit-container">
				<div className="toggle-container">
					<Toggle
						defaultChecked={showCustomFields}
						icons={false}
						onChange={() => setShowCustomFields(!showCustomFields)} />
					<span className="toggle-label">Enter Custom Charity Info?</span>
				</div>
				<div style={{ "margin-top": "10px" }}>
					{charityFields}
				</div>

				<div className="double-input-container">
					<div className="small-input-combo-container">
						<InputHeader value="SELECT CURRENCY" />
						<div className="small-input-container">
							<select id="selectCurrency" value={currency}
								onChange={(event) => setCurrency(event.target.value)}
								className="dropdown-container">
								<option value="invalid">N/A</option>
								{Object.keys(currencyOptions).map(key => (
									<option value={key}>{currencyOptions[key]}</option>
								))}
							</select>
						</div>
					</div>
					<div className="small-input-combo-container">
						<InputHeader value="ENTER DEPOSIT AMOUNT" />
						<div className="small-input-container">
							<Input value={depositAmount}
								onChange={(event) => { setDepositAmount(event.target.value) }}
								type="number" placeholder="XXXXXXXXXXXXXXXXX" />
						</div>
					</div>
				</div>

				<div className="create-buttons-container">
					<Button isDark={true} onClick={doReset}>Reset</Button>
					<Button onClick={doDeposit}>Deposit</Button>
				</div>
			</div>
			<Modal show={showDepositModal} handleClose={() => setShowDepositModal(false)}>
				<span style={{ "font-size": "18px" }}>
					{depositModalMessage}
				</span>
			</Modal>
		</Page>
	)
}

export default Deposit;
