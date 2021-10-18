import React, { useState } from 'react'
import Page from "../Page/Page"
import Button from "../Button/Button"
import Input from "../Input/Input"
import Modal from "../Modal/Modal"
import InputHeader from "../Input/InputHeader"
import Toggle from "react-toggle";
import "react-toggle/style.css"
import "./Deposit.css"

const Deposit = () => {
	const [showCustomFields, setShowCustomFields] = useState(false);

	const [charityAddress, setCharityAddress] = useState(null);
	const [customInterestRate, setCustomInterestRate] = useState(null);
	const [currency, setCurrency] = useState(null);
	const [depositAmount, setDepositAmount] = useState(null);

	const [showReferralModal, setShowReferralModal] = useState(false);
	const [referralLink, setReferralLink] = useState(null)

	const doDeposit = () => {
		var getUrl = window.location;
		var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
		var select = document.getElementById("selectInterest");
		console.log(select);

		let referralLink;
		if (!charityAddress) {
			referralLink = "Must provide a charity wallet address.";
		} else if (!customInterestRate) {
			referralLink = "Must provide a gift rate.";
		} else if (!currency) {
			referralLink = "Must provide a charity name.";
		} else if (!depositAmount) {
			referralLink = "Must provide deposit amount.";
		} else {
			referralLink = `${baseUrl}deposit?address=${charityAddress}&rate=${customInterestRate}&name=${currency}&depositAmount=${depositAmount}`;
		}

		setReferralLink(referralLink);
		setShowReferralModal(true);
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
			<InputHeader value="ENTER CUSTOM GIFT RATE" />
			<div className="large-input-container">
				<Input value={customInterestRate}
					onChange={(event) => { setCustomInterestRate(event.target.value) }}
					type="number" placeholder="XX%" />
			</div>
		</>;
	} else {
		charityFields = <>
			<InputHeader value="SELECT CHARITY" />
			<select id="selectInterest" className="dropdown-container">
				<option value="-1">N/A</option>
				<option value="1%">Charity 1</option>
				<option value="2%">Charity 2</option>
				<option value="3%">Charity 3</option>
			</select>
			<InputHeader value="SELECT GIFT RATE" />
			<div>
				<select id="selectInterest" className="dropdown-container">
					<option value="-1">N/A</option>
					<option value="5">5%</option>
					<option value="10">10%</option>
					<option value="15">15%</option>
					<option value="20">20%</option>
					<option value="25">25%</option>
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
							<select id="selectInterest" className="dropdown-container">
								<option value="-1">N/A</option>
								<option value="BTC">Bitcoin</option>
								<option value="ETH">Ethereum</option>
								<option value="USDT">USD Token</option>
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
					<Button isDark={true} onClick={doDeposit}>Deposit</Button>
					<Button>Deploy New Vault</Button>
				</div>
			</div>
			<Modal show={showReferralModal} handleClose={() => setShowReferralModal(false)}>
				<span style={{ "font-size": "18px" }}>
					{referralLink}
				</span>
			</Modal>
		</Page>
	)
}

export default Deposit;
