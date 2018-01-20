import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, Button, ButtonToolbar } from 'react-bootstrap';
import styles from './style.acss';

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top" role="navigation">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="index.html">Toro Solutions</a>
                </div>
            </nav>
        );
    }
}
