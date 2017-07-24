import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import LoginPage from './login/LoginPage'
import NodePage from './nodes/NodePage'
import TopBar from './TopBar'



class Root extends Component {

    const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
          return childrenArray[0] || null;
};


    render() {
        return (
            <div className="App">
            <div className="TopBar">
            <Link to="/">Home</Link>
            <Link to="/subpage">Subpage</Link>
            </div>
                        <div className="wrapper">
                        <TopBar/>
                        <Route
                    exact
                    path="/login"
                    children={({ match, ...rest }) => (
                    <TransitionGroup component={firstChild}>
                        {match && <LoginPage {...rest} />}
                </TransitionGroup>
                )}/>
                <Route
                    path="/nodes"
                    children={({ match, ...rest }) => (
                    <TransitionGroup component={firstChild}>
                        {match && <NodePage {...rest} />}
                </TransitionGroup>
                )}/>
                </div>
            </div>
    );
    }
}
export default Root;