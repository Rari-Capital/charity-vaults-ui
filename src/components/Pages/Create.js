import React, { useState, useContext } from 'react'
import Page from "../Page/Page"
import RariContext from '../../Context';
import Button from "../Button/Button"
import Input from "../Input/Input"
import Modal from "../Modal/Modal"
import InputHeader from "../Input/InputHeader"
import { ethers } from 'ethers';
import "./Create.css"

import CharityVaultFactoryABI from '../../contracts/CharityVaultFactory.sol/CharityVaultFactory.json';

const Create = () => {
    const [charityAddress, setCharityAddress] = useState(null);
    const [giftRate, setGiftRate] = useState(null);
    const [charityName, setCharityName] = useState(null);

    const [showReferralModal, setShowReferralModal] = useState(false);
    const [referralLink, setReferralLink] = useState(null)

    const charityVaultFactoryAddress = '0x293e3a98CC905e759EDB07d579fa2Cdb24941575';

    const context = useContext(RariContext);
    const provider = context.web3provider;
    const signer = context.web3signer;
    const charityVaultFactoryContract = new ethers.Contract(charityVaultFactoryAddress, CharityVaultFactoryABI.abi, signer);

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
        } else {
            referralLink = `${baseUrl}deposit?address=${charityAddress}&rate=${giftRate}&name=${charityName}`;
        }

        referralLink = referralLink.replace(' ', '-');
        
        setReferralLink(referralLink);
        setShowReferralModal(true);
    }

    const deployVault = async () => {

        console.log("Deploy Vault")
        console.log("Charity Address:", charityAddress);
        console.log("Gift Rate:", giftRate);
        console.log("Charity Name:", charityName)

        // let owner = await charityVaultFactoryContract.owner();
        let charityVault = await charityVaultFactoryContract.deployCharityVault("0x5ffbac75efc9547fbc822166fed19b05cd5890bb", charityAddress, giftRate);

        // console.log(owner);
        console.log(charityVault);

    }

    return (
        <Page>
            <div className="create-container">
                <InputHeader value="CHARITY WALLET ADDRESS" />
                <div className="large-input-container">
                    <Input value={charityAddress} 
                    onChange={(event) => {setCharityAddress(event.target.value)}} 
                    type="text" placeholder="XXXXXXXXXXXXXXXXX" />
                </div>
                <div className="double-input-container">
                    <div className="small-input-combo-container">
                        <InputHeader value="INTEREST GIFT RATE" />
                        <div className="small-input-container">
                        <Input value={giftRate} 
                        onChange={(event) => {setGiftRate(event.target.value)}} 
                        type="number" placeholder="XXXXXXXXXXXXXXXXX" />
                        </div>
                    </div>
                    <div className="small-input-combo-container">
                        <InputHeader value="CHARITY NAME" />
                        <div className="small-input-container">
                        <Input value={charityName} 
                        onChange={(event) => {setCharityName(event.target.value)}} 
                        type="text" placeholder="XXXXXXXXXXXXXXXXX" />
                        </div>
                    </div>
                </div>
                <div className="create-buttons-container">
                    <Button isDark={true} onClick={generateReferralLink}>Generate Referral Link</Button>
                    <Button onClick={deployVault}>Deploy New Vault</Button>
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

export default Create;
