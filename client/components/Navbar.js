// Navbar.js
import Logout from './Logout'
import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap'
import React from "react";
export default function Navbar() {
    const handleLogout = () => {
        window.localStorage.removeItem("jwt");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("accountid");
        window.location.replace("http://localhost:3000");
      };
    return (
        <nav className="navbar navbar-expand-sm navbar-light justify-content-center">
            <ul className="navbar-nav">
                <li className="nav-item">
//Link Navigation
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/transfer">
                    </Link>
                </li>
                <Button className="float-right" color="danger" onClick={handleLogout}>Logout</Button>
            </ul>
        </nav>
    );
}