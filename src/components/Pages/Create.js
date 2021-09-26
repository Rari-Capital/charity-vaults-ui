import React from 'react'
import Page from "../Page/Page"
import Button from "../Button/Button"
import Input from "../Input/Input"
import InputHeader from "../Input/InputHeader"
import "./Create.css"


function Create() {
    return (
        <Page>
            <div className="create-container">
                <InputHeader value="CHARITY WALLET ADDRESS" />
                <div className="large-input-container">
                    <Input type="text" placeholder="XXXXXXXXXXXXXXXXX" />
                </div>
                <div className="double-input-container">
                    <div className="small-input-combo-container">
                        <InputHeader value="INTEREST GIFT RATE" />
                        <div className="small-input-container">
                        <Input type="number" placeholder="XXXXXXXXXXXXXXXXX" />
                        </div>
                    </div>
                    <div className="small-input-combo-container">
                        <InputHeader value="CHARITY NAME" />
                        <div className="small-input-container">
                        <Input type="text" placeholder="XXXXXXXXXXXXXXXXX" />
                        </div>
                    </div>
                </div>
                <div className="create-buttons-container">
                    <Button isDark={true}>Generate Referral Link</Button>
                    <Button>Deploy New Vault</Button>
                </div>
            </div>
        </Page>
    )
}

export default Create;
