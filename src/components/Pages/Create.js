import React, { useState } from 'react'
import Page from "../Page/Page"
import Button from "../Button/Button"
import Input from "../Input/Input"
import Modal from "../Modal/Modal"
import InputHeader from "../Input/InputHeader"
import "./Create.css"


const Create = () => {
    const [charityAddress, setCharityAddress] = useState(null);
    const [giftRate, setGiftRate] = useState(null);
    const [charityName, setCharityName] = useState(null);

    const [showReferralModal, setShowReferralModal] = useState(false);
    const [referralLink, setReferralLink] = useState(null)

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

export default Create;
