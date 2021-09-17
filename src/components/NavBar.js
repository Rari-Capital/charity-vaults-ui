import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import rariLogo from '../images/rari.png'
import "./NavBar.css"

function NavBar() {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
    }

    return <>
        <nav className="navbar" >
            <div className="nav-container" >
                    <NavLink exact to="/" className="nav-logo" >
                        <img src={rariLogo} className="rari-logo" />
                    Charity Vaults
        </NavLink>

                <ul className={isOpen ? "nav-menu active" : "nav-menu"} >
                    <li className="nav-item" >
                        <NavLink exact to="/" activeClassName="active" className="nav-links" onClick={handleClick}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/create" activeClassName="active" className="nav-links" onClick={handleClick}>
                            Create
                                </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/deposit" activeClassName="active" className="nav-links" onClick={handleClick}>
                            Deposit
                                </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/withdraw" activeClassName="active" className="nav-links" onClick={handleClick}>
                            Withdraw
                                </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/connect" activeClassName="active" className="nav-links" onClick={handleClick}>
                            Connect
                                </NavLink>
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