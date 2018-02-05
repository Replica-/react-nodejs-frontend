import React, { Component } from "react";
//import { NavLink } from "react-router-dom";
//import { Nav, NavItem, Button, ButtonToolbar } from 'react-bootstrap';
import styles from './style.acss';

import Link from 'common/BreadCrumb/BreadLink';

export default class SideBar extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className='nav navbar-default sidebar' role='navigation'>
                <div className='sidebar-nav navbar-collapse collapse' id='myNavbar' aria-expanded='true'>
                <ul className='nav' id='side-menu'>
                    <li className='sidebar-search'>
                        <div className='input-group custom-search-form'>
                        <input type='text' className='form-control' placeholder='Search...'/>
                        <span className='input-group-btn'>
                        <button className='btn btn-default' type='button'>
                        <i className='fa fa-search'></i>
                        </button>
                        </span>
                    </div>
                    </li>
                    <li>
                        <Link to="/splash"><i className='fa fa-dashboard fa-fw'></i> Dashboard</Link>
                    </li>

                    <li>
                    <a href='#' data-toggle="collapse" href="#multiCollapseExample1" role="button"><i className='fa fa-files-o fa-fw'></i> Configuration<span className='fa arrow'></span></a>
                        <ul id="multiCollapseExample1" className='nav nav-second-level collapse'>
                            <li>
                                <a href='/admin'>Users</a>
                            </li>
                            <li>
                                <a href='/Roles'>Permissions</a>
                            </li>
                            <li>
                                <Link to="/branches">Branches</Link>
                            </li>
                            <li>
                                <Link to="/organisations">Organistions</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                </div>

                </div>
            </div>    );
    }
}
