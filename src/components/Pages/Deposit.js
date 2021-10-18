import React, { useState } from 'react'
import Page from "../Page/Page"
import Button from "../Button/Button"
import Input from "../Input/Input"
import Modal from "../Modal/Modal"
import InputHeader from "../Input/InputHeader"
import "./Deposit.css"

	const Deposit = () => {
		const [charityAddress, setCharityAddress] = useState(null);
		const [customInterestRate, setCustomInterestRate] = useState(null);
		const [currency, setCurrecncy] = useState(null);
		const [depositAmount, setDepositAmount] = useState(null);

		const [showReferralModal, setShowReferralModal] = useState(false);
    	const [referralLink, setReferralLink] = useState(null)
	
		const doDeposit = () => {
			var getUrl = window.location;
			var baseUrl = getUrl .protocol + "//" + getUrl.host + "/";
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

    return (
        <Page>
            <div className="create-container">
                
				<div className="double-input-container">
					<div className="small-input-combo-container">
					<InputHeader value="SELECT CHARITY" />
						<select id="selectInterest" className="dropdown-container">
							<option value="-1">N/A</option>
							<option value="1%">Red Cross</option>
							<option value="2%">Gates Foundation</option>
							<option value="3%">PETA</option>
						</select>
					</div>
					<div className="small-input-combo-container">
						<InputHeader value="ENTER CUSTOM CHARITY ADDRESS" />
						<div className="small-input-container">
							<Input value={charityAddress} 
							onChange={(event) => {setCharityAddress(event.target.value)}} 
							type="text" placeholder="XXXXXXXXXXXXXXXXX" />
						</div>
					</div>
				</div>

				<div className="centered-text">
					OR
				</div>

				<div className="double-input-container">
					<div class="small-input-combo-container">
					<InputHeader value="SELECT INTEREST RATE" />
						<div>
							<select id="selectInterest" className="dropdown-container">
								<option value="-1">N/A</option>
								<option value="1%">1%</option>
								<option value="2%">2%</option>
								<option value="3%">3%</option>
								<option value="4%">4%</option>
								<option value="5%">5%</option>
							</select>
						</div>
					</div>
					<div className="small-input-combo-container">
						<InputHeader value="ENTER CUSTOM IINTEREST RATE" />
						<div className="small-input-container">
							<Input value={customInterestRate}
							onChange={(event) => {setCustomInterestRate(event.target.value)}}
							type="text" placeholder="X.XX%"/>
						</div>
					</div>
				</div>
				
				<div className="centered-text">
					AND
				</div>

				<div className="centered-input-container">
					<div className="small-input-combo-container">
						<InputHeader value="SELECT CURRENCY" />
						<div className="small-input-container">
							<Input value={currency} 
							onChange={(event) => {setCurrecncy(event.target.value)}} 
							type="text" placeholder="XXXXXXXXXXXXXXXXX" />
						</div>
					</div>
				</div>
				<div className="centered-input-container">
					<div className="small-input-combo-container">
					<InputHeader value="SELECT DEPOSIT AMOUNT" />
						<div className="small-input-container">
						<Input value={depositAmount} 
						onChange={(event) => {setDepositAmount(event.target.value)}} 
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
                <span style={{"font-size": "18px"}}>
                    {referralLink}
                </span>
            </Modal>
        </Page>
    )
}

export default Deposit;
