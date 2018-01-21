import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from './common/CommonActions'
import { Row, Col } from 'react-bootstrap';
import NavBar from 'common/NavBar'

export class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { children, show } = this.props

        let layout;
        /*
        if ((this.props.auth)) {
            layout = (
                <Row>
                    <Col xs={12} sm={4}>
                        <SideBar/>
                    </Col>
                    <Col xs={12} sm={8}>
                        {children}
                    </Col>
                </Row>);
        } else {
        */
        layout = (
            <Row>
                <Col xs={12}>
                    <div>
                        {children}
                    </div>
                </Col>
            </Row>);
        //}

        return (
            <div>
                {show?<div className="loadingSpinner"><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading</div>:null}
                <Row>
                    <Col xs={12}>
                        <NavBar/>
                    </Col>
                </Row>
                {layout}
            </div>
       );
    }
}

function mapStateToProps(state/*, ownProps*/) {

    var authenticated = true;
    if (state.entities && state.entities.user && state.entities.user.accessToken) {
        authenticated = true;
    } else {
        authenticated = false;
    }

    return {
        show: state.config.show_loading?true:false,
        auth: authenticated
    }
}

export default connect(mapStateToProps, {
    showLoading, hideLoading,
})(App)
