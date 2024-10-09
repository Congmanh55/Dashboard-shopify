import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@shopify/polaris";
import { HomeIcon, SettingsIcon, ProductIcon } from "@shopify/polaris-icons";

const NavBar = () => {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            <span className="nav_icon">
                                <Icon source={HomeIcon} tone="base" />
                            </span>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            <span className="nav_icon">
                                <Icon source={ProductIcon} tone="base" />
                            </span>
                            Products
                        </NavLink>
                    </li>
                    <li className="bottom">
                        <NavLink
                            to="/setting"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            <span className="nav_icon">
                                <Icon source={SettingsIcon} tone="base" />
                            </span>
                            Setting
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
