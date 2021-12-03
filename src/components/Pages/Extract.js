import React, { useState, useContext } from 'react'
import Page from "../Page/Page"
import RariContext from '../../Context';
import Button from "../Button/Button"
import Input from "../Input/Input"
import Modal from "../Modal/Modal"
import Toggle from "react-toggle";
import { Tokens, Charities, interestRateOptions } from '../../config'
import InputHeader from "../Input/InputHeader"
import { getCharityVaultFactoryContract, getCharityVaultContract } from '../../Contracts';
import "./Create.css"


const Extract = () => {
    const context = useContext(RariContext);
    const provider = context.web3provider;
    const signer = context.web3signer;

    const [showCustomFields, setShowCustomFields] = useState(false);

    // Pre-select fields
    const [charityName, setCharityName] = useState("invalid");
    const [interestRate, setInterestRate] = useState("invalid");

    // Custom fields
    const [charityAddress, setCharityAddress] = useState(null);
    const [customInterestRate, setCustomInterestRate] = useState(null);

    const [currency, setCurrency] = useState("invalid");

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);

    const [showExtractionConfirmationModal, setShowExtractionConfirmationModal] = useState(false);

    const reset = () => {
        setCharityName("invalid");
        setCharityAddress("");
        setCustomInterestRate("");
        setInterestRate("invalid");
        setCurrency("invalid");
    }

    const initiateExtraction = () => {
        let message;
        let errorOccurred;
        let selectedAddress;
        let selectedInterestRate;
        if (showCustomFields) {
            if (!charityAddress) {
                message = "Must provide a charity wallet address.";
                errorOccurred = true;
            } else if (!customInterestRate || customInterestRate <= 0 || customInterestRate >= 100) {
                message = "Must provide a valid gift rate.";
                errorOccurred = true;
            } else {
                selectedAddress = charityAddress;
                selectedInterestRate = customInterestRate;
            }
        } else {
            if (!charityName || charityName === "invalid") {
                message = "Must select a charity.";
                errorOccurred = true;
            } else if (!interestRate || interestRate === "invalid") {
                message = "Must select a gift rate.";
                errorOccurred = true;
            } else {
                selectedAddress = Charities[charityName];
                selectedInterestRate = interestRate;
            }
        }

        if (!errorOccurred) {
            if (!currency || currency === "invalid") {
                errorOccurred = true;
                message = "Must select a currency.";
            }
        }

        if (errorOccurred) {
            setModalMessage(message);
            setShowModal(true);
        } else {
            setShowExtractionConfirmationModal(true);
        }
    }

    const doExtract = async () => {
        let selectedAddress;
        let selectedInterestRate;

        if(showCustomFields) {
            selectedAddress = charityAddress;
            selectedInterestRate = customInterestRate;
        } else {
            selectedAddress = Charities[charityName];
            selectedInterestRate = interestRate;
        }


        const charityVaultContract = await getCharityVaultContract(Tokens[currency], selectedAddress, selectedInterestRate, signer);

        if(!charityVaultContract) {
            setModalMessage("A charity vault does not exist with the provided information.");
        } else {
            await charityVaultContract.withdrawInterestToCharity();
            setModalMessage("Extracted successfully!");
            setShowExtractionConfirmationModal(false);
        }
        setShowModal(true);
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
            <div className="create-container">
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
                <div>
                    <InputHeader value="SELECT CURRENCY" />
                    <select id="selectCurrency" value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                        className="dropdown-container">
                        <option value="invalid">N/A</option>
                        {Object.keys(Tokens).map(key => (
                            <option value={key}>{key}</option>
                        ))}
                    </select>
                </div>
                <div className="create-buttons-container">
                    <Button isDark={true} onClick={reset}>Reset</Button>
                    <Button onClick={initiateExtraction}>Extract</Button>
                </div>
            </div>
            <Modal show={showExtractionConfirmationModal} buttonText="Confirm Extraction" extraButtonText="Cancel"
                extraButtonClick={() => setShowExtractionConfirmationModal(false)} handleClose={() => doExtract()}>
                <div>
                    <h2 className="modal-header">Confirm Extraction</h2>
                    <div>
                        <span className="modal-span"><strong>Gift Rate:</strong> {showCustomFields ? customInterestRate : interestRate}%</span>
                    </div>
                    <div>
                        <span className="modal-span"><strong>About to Extract {currency} from Charity Vault</strong></span>
                    </div>
                </div>
            </Modal>
            <Modal show={showModal} handleClose={() => setShowModal(false)}>
                <span style={{ "font-size": "18px" }}>
                    {modalMessage}
                </span>
            </Modal>
        </Page>
    )
}

export default Extract;
