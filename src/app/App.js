import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showPage, hidePage } from './common/CommonActions'
//import ReactDOM from 'react-dom'


import PropTypes from 'prop-types';

import { Link, browserHistory } from 'react-router'

class App extends Component {

    constructor(props) {
        super(props);

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
        console.error("update");
    }

    render() {
/*
        if (!this.props.show) {
            return (<div id='main'>wee</div>);
        }
*/
        const { children} = this.props

        return (
            <div id='main'>
            {children}
            </div>
       );
    }
}

function mapStateToProps(state, ownProps) {
    console.error(state.config);

    return {
        show: state.config.page?true:false,
        showPage: PropTypes.func.isRequired,
        hidePage: PropTypes.func.isRequired,
    }
}

export default connect(mapStateToProps, {
    showPage, hidePage,
})(App)
