import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setShowPage, setHidePage } from './common/PortholeActions'
import ReactDOM from 'react-dom'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        window.React.ContentCSS = $('<link rel="stylesheet" type="text/css" href=""/>');
        $('head').append(window.React.ContentCSS);
        window.react.routes = this.props.routes;
        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidUpdate(){
        if (this.props.stack.length == 1) {
            var url =  this.props.location.pathname;

            if (!url.includes("content/")) {
                if (!url.includes("system/")) {
                    localStorage.setItem('REACT-CSR-openOn', url);
                    console.error(url);
                }
            }
        }
    }

    // WebkitOverflowScrolling: 'touch' - will break iframe - or iscroll scrolling. we turn this off to prevent this
    render() {
        const { children } = this.props

        if ((!this.props.showScreen) || (typeof this.props.showScreen == 'undefined')) {
            return null;
        }

        return (<div id='mainDiv' style={{
                WebkitOverflowScrolling: 'touch'
            }}>
                {children}
            </div>);
        }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
}

App.childContextTypes = {
    windowProxy: PropTypes.object
}

App.propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node,
    location: React.PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
    return {
        stack: state.page.stack,
        setHidePage: PropTypes.func.isRequired,
        setShowPage: PropTypes.func.isRequired,
        errorMessage: state.errorMessage,
        inputValue: ownProps.location.pathname.substring(1),
        clientHeight: state.windowSize.screenHeight,
        showScreen: state.config.showPage
    }
}

export default connect(mapStateToProps, {
    setHidePage, setShowPage
})(App)
