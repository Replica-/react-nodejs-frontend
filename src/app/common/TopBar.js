import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, Button, ButtonToolbar } from 'react-bootstrap';

export default class TopBar extends Component {
    render() {
        return (
            <ButtonToolbar>
               <Button bsStyle="primary"><NavLink to="/login">Menu Item 1</NavLink></Button>
                <Button bsStyle="success"><NavLink to="/nodes">Menu Item 2</NavLink></Button>
            </ButtonToolbar>
          );
    }
}