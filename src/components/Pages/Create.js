import React, { useState, useContext } from 'react'
import Page from "../Page/Page"
import RariContext from '../../Context';
import Button from "../Button/Button"
import Input from "../Input/Input"
import Modal from "../Modal/Modal"
import InputHeader from "../Input/InputHeader"
import { Tokens } from './../../config';
import { getCharityVaultFactoryContract, getCharityVaultContract } from '../../Contracts';
import "./Create.css"


const Create = () => {
    const context = useContext(RariContext);
    const provider = context.web3provider;
    const signer = context.web3signer;

    const [charityAddress, setCharityAddress] = useState(null);
    const [giftRate, setGiftRate] = useState(null);
    const [charityName, setCharityName] = useState(null);
    const [currency, setCurrency] = useState("invalid");

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);

    const generateReferralLink = () => {
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";

        let referralLink;
        if (!charityAddress) {
            referralLink = "Must provide a charity wallet address.";
        } else if (!giftRate) {
            referralLink = "Must provide a gift rate.";
        } else if (!charityName) {
            referralLink = "Must provide a charity name.";
        } else if (!currency || currency == "invalid") {
            referralLink = "Must select a currency.";
        } else {
            referralLink = `${baseUrl}deposit?address=${charityAddress}&rate=${giftRate}&name=${charityName}&currency=${currency}`;
        }

        referralLink = referralLink.replace(' ', '-');

        setModalMessage(referralLink);
        setShowModal(true);
    }

    const deployVault = async () => {

        let message = "Deploy Vault Successful";
        if (!charityAddress) {
            message = "Must provide a charity wallet address.";
        } else if (!giftRate) {
            message = "Must provide a gift rate.";
        } else if (!charityName) {
            message = "Must provide a charity name.";
        } else if (!currency || currency == "invalid") {
            message = "Must select a currency.";
        } else if (!signer) {
            message = "Must connect to a wallet.";
        } else {

            const existingCharityVault = await getCharityVaultContract(Tokens[currency], charityAddress, giftRate, signer);

            if (existingCharityVault) {
                message = "A charity vault already exists with the provided information."
            } else {
                const charityVaultFactoryContract = getCharityVaultFactoryContract(signer);
                await charityVaultFactoryContract.deployCharityVault(Tokens[currency], charityAddress, giftRate);
                message = "Successfully deployed the new charity vault!";
            }
        }
        setModalMessage(message);
        setShowModal(true);
    }

    return (
        <Page>
            <div className="create-container">
                <InputHeader value="CHARITY WALLET ADDRESS" />
                <div className="large-input-container">
                    <Input value={charityAddress}
                        onChange={(event) => { setCharityAddress(event.target.value) }}
                        type="text" placeholder="XXXXXXXXXXXXXXXXX" />
                </div>
                <InputHeader value="CHARITY NAME" />
                <div className="large-input-container">
                    <Input value={charityName}
                        onChange={(event) => { setCharityName(event.target.value) }}
                        type="text" placeholder="XXXXXXXXXXXXXXXXX" />
                </div>
                <div className="double-input-container">
                    <div className="small-input-combo-container">
                        <InputHeader value="INTEREST GIFT RATE" />
                        <div className="small-input-container">
                            <Input value={giftRate}
                                onChange={(event) => { setGiftRate(event.target.value) }}
                                type="number" placeholder="XXXXXXXXXXXXXXXXX" />
                        </div>
                    </div>
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
                </div>
                <div className="create-buttons-container">
                    <Button isDark={true} onClick={generateReferralLink}>Generate Referral Link</Button>
                    <Button onClick={deployVault}>Deploy New Vault</Button>
                </div>
            </div>
            <Modal show={showModal} handleClose={() => setShowModal(false)}>
                <span style={{ "font-size": "18px" }}>
                    {modalMessage}
                </span>
            </Modal>
        </Page>
    )
}

export default Create;
