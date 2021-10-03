import React from 'react'
import Page from "../Page/Page"
import Card from "../Card/Card"
import Button from "../Button/Button"
import { useDispatch } from "react-redux"
import { testToggle } from "./../../redux/actions/test"
import "./Connect.css"


const Connect = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(testToggle());
    }

    return (
        <Page>
            <div className="connect-card-container">
                <Card name="Connected Address" value="XXXXXXXXXXXXXXXXXXXXX"/>
            </div>
            <div className="connect-card-container">
                <Card name="Wallet Provider" value="Metamask"/>
            </div>
            <div className="connect-buttons-container">
                    <Button onClick={handleClick} isDark={true}>Disconnect</Button>
                    <Button>Connect</Button>
                </div>
        </Page>
    )
}

export default Connect;
