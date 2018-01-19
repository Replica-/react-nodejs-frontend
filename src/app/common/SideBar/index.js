import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, Button, ButtonToolbar } from 'react-bootstrap';
import styles from './style.acss';

export default class SideBar extends Component {
    render() {
        return (
            <div className={styles.container}>
            <div className="navbar-default sidebar"  role="navigation">
            <div className="sidebar-nav">
            <ul className="nav" id="side-menu">

            <li className="sidebar-search">
                <div className="input-group custom-search-form">
                    <input type="text" className="form-control" placeholder="Search..."/>
                    <span className="input-group-btn">
                    <button className="form-control btn btn-default" type="button">
                    <i className="fa fa-search"></i>
                    </button>
                    </span>
                </div>

            </li>
            <li>
                <a href="index.html"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
            </li>
            <li>
                <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i> Charts<span className="fa arrow"></span></a>
                </li>
             </ul>

            </div>
            </div>
            </div>    );
    }
}
