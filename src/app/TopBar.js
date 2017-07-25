
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class TopBar extends Component {
    render() {
        return (
            <div className="top-bar">
            <nav>

            <NavLink to="/login">Menu Item 1</NavLink>
            <NavLink to="/nodes">Menu Item 2</NavLink>
        </nav>
        </div>
    )
    }
}