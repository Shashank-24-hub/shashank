import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    Dashboard
                </li>
                <li>
                    <NavLink to="/portfolio"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        className={({ isActive }) => (isActive ? "active-link" : "")} >
                        Portfolio
                    </NavLink>
                </li>
                <li>Notifications</li>
                <li>Notices</li>
                <li>Auction</li>
                <li>Data Upload</li>
                <li>Control Panel</li>
                <li>User Management</li>
                <li>Permissions</li>
            </ul>
        </div>
    );
};

export default Sidebar;
