import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from "../Button/Button"
import Page from "../Page/Page"
import { useSelector } from "react-redux"
import "./Home.css"


const Home = () => {
    const buttonClick = () => {
        console.log("Clicked!");
    }

    const testToggle = useSelector(state => state.test.testToggle);
    console.log(testToggle);

    return (
        <Page>
            <h1 className="home-header">A New Way To Donate</h1>
            <div className="home-details-container">
                <p className="home-details-paragraph">Deposit Assets.</p>
                <p className="home-details-paragraph">Accrue Interest.</p>
                <p className="home-details-paragraph">Donate A % Of Your Interest To Charity.</p>
            </div>
            <div className="home-buttons-container">
                <NavLink exact to="/create">
                    <Button isDark={true} onClick={buttonClick}>I'm a Charity</Button>
                </NavLink>
                <NavLink exact to="/connect">
                    <Button>Get Started</Button>
                </NavLink>
            </div>
        </Page>
    )
}

export default Home;
