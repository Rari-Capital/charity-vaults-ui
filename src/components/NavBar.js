import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import rariLogo from '../images/rari.png'
import "./NavBar.css"

const NavBar = () => {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
    }

    const handleLinkClick = () => {
        if(isOpen) {
            setOpen(false);
        }
    }

    return <>
        <nav className="navbar" >
            <div className="nav-container" >
                    <NavLink exact to="/" className="nav-logo" >
                        <img src={rariLogo} alt="rari-logo" className="rari-logo" />
                    Charity Vaults
        </NavLink>

                <ul className={isOpen ? "nav-menu active" : "nav-menu"} >
                    <li className="nav-item" >
                        <NavLink exact to="/" activeClassName="active" className="nav-links" onClick={handleLinkClick}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/create" activeClassName="active" className="nav-links" onClick={handleLinkClick}>
                            Create
                                </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/deposit" activeClassName="active" className="nav-links" onClick={handleLinkClick}>
                            Deposit
                                </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/withdraw" activeClassName="active" className="nav-links" onClick={handleLinkClick}>
                            Withdraw
                                </NavLink>
                    </li>
                    <li className="nav-button-item" >
                        <div className="nav-button">
                        <NavLink exact to="/connect" activeClassName="active" className="nav-links button-links" onClick={handleLinkClick}>
                            Connect
                                </NavLink>
                                </div>
                    </li>
                </ul>
                <div className="nav-icon" onClick={handleClick}>
                    <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
            </div>
        </nav>
    </>
}

export default NavBar