import React, { Component } from "react";

export default class NavBar extends Component {
    render() {

        let authenticatedHtml = null;

        if (this.props.showAuthenticated) {
            authenticatedHtml =
                (<div>
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>


                <ul className="navbar-top-links navbar-right">
                <li className='dropdown'>
                <a className='dropdown-toggle' data-toggle='dropdown' href='#' aria-expanded='true'>
                <i className='fa fa-user fa-fw'></i> <i className='fa fa-caret-down'></i>
                </a>
                <ul className='dropdown-menu dropdown-user'>
                <li><a href='#'><i className='fa fa-user fa-fw'></i> User Profile</a>
            </li>
            <li><a href='#'><i className='fa fa-gear fa-fw'></i> Settings</a>
                </li>
                <li className='divider'></li>
                <li><a href='login.html'><i className='fa fa-sign-out fa-fw'></i> Logout</a>
                </li>
                </ul>
                </li>
                </ul></div>);
        }


        return (
            <nav className="nav navbar-default navbar-static-top" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand" href="index.html">Toro Solutions</a>

                    {(this.props.showAuthenticated)?authenticatedHtml:null}
                </div>
            </nav>
        );
    }
}
