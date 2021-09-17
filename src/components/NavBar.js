import React from 'react'
import { NavLink } from 'react-router-dom'
import rariLogo from '../images/rari.png'
import "./NavBar.css"

function NavBar() {
    return <>
        <nav className="navbar" >
            <div className="nav-container" >
                <NavLink exact to="/" className="nav-logo" >
                    <img src={ rariLogo } className="rari-logo" />
                    Charity Vaults
        </NavLink>

                <ul className="nav-menu" >
                    <li className="nav-item" >
                        <NavLink exact to="/" activeClassName="active" className="nav-links" >
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/create" activeClassName="active" className="nav-links" >
                            Create
                                </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/deposit" activeClassName="active" className="nav-links" >
                            Deposit
                                </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/withdraw" activeClassName="active" className="nav-links" >
                            Withdraw
                                </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink exact to="/connect" activeClassName="active" className="nav-links" >
                            Connect
                                </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </>
}

export default NavBar