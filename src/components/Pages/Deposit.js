import React, { useState, useContext } from 'react'
import Page from "../Page/Page"
import RariContext from '../../Context';
import Button from "../Button/Button"
import Input from "../Input/Input"
import Modal from "../Modal/Modal"
import InputHeader from "../Input/InputHeader"
import { ethers } from 'ethers';
import bigInt from "big-integer";
import Toggle from "react-toggle";
import { useLocation } from "react-router-dom";
import { Tokens, Charities, interestRateOptions } from '../../config'
import { getCharityVaultFactoryContract, getCharityVaultContract,
		 getCharityVaultContractAddress, getUnderlyingContractByAddress } from '../../Contracts';
import "react-toggle/style.css"
import "./Deposit.css"


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

	const [showDepositConfirmationModal, setShowDepositConfirmationModal] = useState(false);
	const [showDepositApprovalModal, setShowDepositApprovalModal] = useState(false);

	const [showDepositModal, setShowDepositModal] = useState(false);
	const [depositModalMessage, setDepositModalMessage] = useState(null);

	const [isApproved, setIsApproved] = useState(false);

	const initiateDeposit = async () => {
		let selectedAddress;
		let selectedInterestRate;
		let depositMessage;
		let errorOccurred = false
		if (showCustomFields) {
			if (!charityAddress) {
				depositMessage = "Must provide a charity wallet address.";
				errorOccurred = true;
			} else if (!customInterestRate || customInterestRate <= 0 || customInterestRate >= 100) {
				depositMessage = "Must provide a valid gift rate.";
				errorOccurred = true;
			} else {
				selectedAddress = charityAddress;
				selectedInterestRate = customInterestRate;
			}
		} else {
			if (!charityName || charityName === "invalid") {
				depositMessage = "Must select a charity.";
				errorOccurred = true;
			} else if (!interestRate || interestRate === "invalid") {
				depositMessage = "Must select a gift rate.";
				errorOccurred = true;
			} else {
				selectedAddress = Charities[charityName];
				selectedInterestRate = interestRate;
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
			const underlyingContract = getUnderlyingContractByAddress(Tokens[currency], signer);
			const charityVaultContract = await getCharityVaultContract(Tokens[currency], selectedAddress, selectedInterestRate, signer);
			const charityVaultContractAddress = await getCharityVaultContractAddress(Tokens[currency], selectedAddress, selectedInterestRate, signer);
			
			if (!charityVaultContract) {
				depositMessage = "A charity vault does not exist with the provided information.";
				errorOccurred = true;
			} else {
				// If contract exists, check if user needs to approve tokens or not
				let allowance = await underlyingContract.allowance(signer.getAddress(), charityVaultContractAddress);
				allowance = ethers.utils.formatEther(allowance);

				// User has allowance to deposit underlying
				if (allowance >= parseFloat(depositAmount)) {
					setShowDepositConfirmationModal(true);
					setIsApproved(true);
					
				} else { // User does NOT have allowance to deposit underlying
					setIsApproved(false);
					setShowDepositApprovalModal(true);
				}
			}
		}

		if(errorOccurred) {
			// Show the modal with error message.
			setDepositModalMessage(depositMessage);
			setShowDepositModal(true);
		}
	}

	const doApproval = async () => {
		let selectedAddress;
		let selectedInterestRate;
		if (showCustomFields) {
			selectedAddress = charityAddress;
			selectedInterestRate = customInterestRate;
		} else {
			selectedAddress = Charities[charityName];
			selectedInterestRate = interestRate;
		}

		const underlyingContract = getUnderlyingContractByAddress(Tokens[currency], signer);
		const charityVaultContractAddress = await getCharityVaultContractAddress(Tokens[currency], selectedAddress, selectedInterestRate, signer);
		
		await underlyingContract.approve(charityVaultContractAddress, String(bigInt(depositAmount * (10**18))));
		setShowDepositApprovalModal(false);
		setDepositModalMessage("Approving Underlying! Monitor your wallet for the transaction status!");
		setShowDepositModal(true);
	}

	const doDeposit = async () => {
		let depositMessage;
		let selectedAddress;
		let selectedInterestRate;
		if (showCustomFields) {
			selectedAddress = charityAddress;
			selectedInterestRate = customInterestRate;
		} else {
			selectedAddress = Charities[charityName];
			selectedInterestRate = interestRate;
		}

		const charityVaultContract = await getCharityVaultContract(Tokens[currency], selectedAddress, selectedInterestRate, signer);
		
		// we need to multiply deposit amount to add 18 decimals for (most) erc-20 token contracts
		await charityVaultContract.deposit(String(bigInt(depositAmount * (10**18))));

		depositMessage = `Successful deposit!`;
		setShowDepositConfirmationModal(false);
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
			for (const [key, value] of Object.entries(Charities)) {
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
				{Object.keys(Charities).map(key => (
					<option value={key}>{key}</option>
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
					<Button onClick={initiateDeposit}>Approve / Deposit</Button>
				</div>
			</div>
			<Modal show={showDepositConfirmationModal} buttonText="Deposit" extraButtonText="Cancel"
			extraButtonClick={() => setShowDepositConfirmationModal(false)} handleClose={() => doDeposit()}>
                <div>
                    <h2 className="modal-header">Deposit Information</h2>
                    <div>
                        <span className="modal-span"><strong>Gift Rate:</strong> {showCustomFields ? customInterestRate : interestRate}%</span>
                    </div>
                    <div>
                        <span className="modal-span"><strong>Amount To Deposit:</strong> {depositAmount} {currency}</span>
                    </div>
                </div>
            </Modal>
			<Modal show={showDepositApprovalModal} buttonText="Approve" extraButtonText="Cancel"
			extraButtonClick={() => setShowDepositApprovalModal(false)} handleClose={() => doApproval()}>
                <div>
                    <h2 className="modal-header">Deposit Information</h2>
                    <div>
                        <span className="modal-span"><strong>Gift Rate:</strong> {showCustomFields ? customInterestRate : interestRate}%</span>
                    </div>
                    <div>
                        <span className="modal-span"><strong>Amount To Approve:</strong> {depositAmount} {currency}</span>
                    </div>
                </div>
            </Modal>
			<Modal show={showDepositModal} handleClose={() => setShowDepositModal(false)}>
				<span style={{ "font-size": "18px" }}>
					{depositModalMessage}
				</span>
			</Modal>
		</Page>
	);
}

export default Deposit;
