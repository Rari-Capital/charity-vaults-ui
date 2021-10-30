import React, { useState, useContext } from 'react'
import Page from "../Page/Page"
import RariContext from '../../Context';
import Button from "../Button/Button"
import Input from "../Input/Input"
import Modal from "../Modal/Modal"
import InputHeader from "../Input/InputHeader"
import Toggle from "react-toggle";
import { useLocation } from "react-router-dom";
import { Tokens } from '../../config'
import { getCharityVaultFactoryContract, getCharityVaultContract } from '../../Contracts';
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

const Deposit = () => {
	const search = useLocation().search;

	const context = useContext(RariContext);
	const provider = context.web3provider;
	const signer = context.web3signer;

	const [showCustomFields, setShowCustomFields] = useState(false);
	const [referralParamsHandled, setReferralParamsHandled] = useState(false);

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

	const doDeposit = async () => {
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

			console.log(Tokens[currency]);
			console.log(charityAddress);
			console.log(interestRate);

			const charityVaultContract = await getCharityVaultContract(Tokens[currency], "0xBB379331De54A7c0a4b2bfF5A54A14cdba7E9E6d", interestRate, signer);
			// const charityVaultContract = await getCharityVaultContract("0x5ffbac75efc9547fbc822166fed19b05cd5890bb", "0x05AB381A007A90E541433f3DC574AcD3E389f898", 5, signer);
			
			// Do deposit here
			if (charityVaultContract) {
					// TODO: do we need to convert erc-20 to proper decimal input before calling deposit?
					// depositAmount *= decimals; 
					// await charityVaultContract.deposit(depositAmount);
					depositMessage = `Successful deposit!`
			} else {
					depositMessage = "A charity vault does not exist with the provided information."
			}
			
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

	const handleReferralParams = () => {
		const address = new URLSearchParams(search).get('address');
		const rate = new URLSearchParams(search).get('rate');
		let name = new URLSearchParams(search).get('name');
		let currency = new URLSearchParams(search).get('currency');
		if(!name || !rate || !address || !currency) {
			return;
		}
		name = name.replace("-", " ");
		let foundName = false;
		if (name) {
			for (const [key, value] of Object.entries(charityOptions)) {
				if(key.toLowerCase() === name.toLowerCase()) {
					setCharityName(key);
					foundName = true;
				}
			}
		}
		if (address) {
			setCharityAddress(address);
		}
		for (const [key, value] of Object.entries(interestRateOptions)) {
			if(key === rate) {
				setInterestRate(key);
			}
		}
		if(rate) {
			setCustomInterestRate(rate);
		}
		if(currency && currency in Tokens) {
			setCurrency(currency);
		}
		if(foundName) {
			setShowCustomFields(false);
		} else {
			setShowCustomFields(true);
		}
		setReferralParamsHandled(true);
	};

	if (!referralParamsHandled) {
		handleReferralParams();
	}

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
								{Object.keys(Tokens).map(key => (
									<option value={key}>{key}</option>
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
