import React from 'react'
import Page from "../Page/Page"
import Card from "../Card/Card"
import Button from "../Button/Button"
import "./Connect.css"


function Connect() {
    return (
        <Page>
            <div className="connect-card-container">
                <Card name="Connected Address" value="XXXXXXXXXXXXXXXXXXXXX"/>
            </div>
            <div className="connect-card-container">
                <Card name="Wallet Provider" value="Metamask"/>
            </div>
            <div className="connect-buttons-container">
                    <Button isDark={true}>Disconnect</Button>
                    <Button>Connect</Button>
                </div>
        </Page>
    )
}

export default Connect;
