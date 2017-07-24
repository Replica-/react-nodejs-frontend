import React, { Component } from 'react'
import { connect } from 'react-redux'
//import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-transition-group';

import { Link, browserHistory } from 'react-router'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
       /*
        window.React.ContentCSS = $('<link rel="stylesheet" type="text/css" href=""/>');
        $('head').append(window.React.ContentCSS);
        window.react.routes = this.props.routes;
        */
        window.React = React;
        /*
        window.ReactDOM = ReactDOM;
         */

    }

    componentDidUpdate(){

    }

    render() {
        const { children } = this.props
        return (<div id='main'>

                 <ReactCSSTransitionGroup
                 transitionName="example"
                 transitionEnterTimeout={500}
                 transitionLeaveTimeout={300}>
                     {children}
                 </ReactCSSTransitionGroup>
            </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return {

    }
}

export default connect(mapStateToProps, {

})(App)
