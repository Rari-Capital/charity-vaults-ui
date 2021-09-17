import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"

function NavBar() {
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact to="/" className="nav-logo">
                        Logo
                    </NavLink>

                    <ul>
                        <li>
                            <NavLink exact to="/" className="nav-links">
                                Home
                    </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/create" className="nav-links">
                                Create
                    </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/deposit" className="nav-links">
                                Deposit
                    </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/withdraw" className="nav-links">
                                Withdraw
                        </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/connect" className="nav-links">
                                Connect
                        </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar
