import React, { Component } from "react";

export default class NavBar extends Component {
    render() {

        let authenticatedHtml = null;

        if (this.props.showAuthenticated) {
            authenticatedHtml = [(
                <button key={2} type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
             ),(
                <div key={3} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            ),(
            <ul key={4} className="nav navbar-top-links right">
                <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" data-offset="-250" href="#" aria-expanded="false">
                <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                </a>
                <ul className="dropdown-menu dropdown-messages">
                <li>
                <a href="#">
                <div>
                <strong>John Smith</strong>
            <span className="pull-right text-muted">
                <em>Yesterday</em>
                </span>
                </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
            </a>
            </li></ul></li></ul>
            )
        ];
        }

        return (
            <nav className="nav navbar-default navbar-static-top" role="navigation">
                <div className="">
                    <a className="navbar-brand" href="index.html">Toro Solutions</a>

                    {(this.props.showAuthenticated)?authenticatedHtml:null}
                </div>
            </nav>
        );
    }
}
