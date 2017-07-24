
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class TopBar extends Component {
    render() {
        return (
            <div className="top-bar">
            <nav>

            <NavLink to="/login">Projects</NavLink>
            <NavLink to="/nodes">Non-existent route</NavLink>
        </nav>
        </div>
    )
    }
}