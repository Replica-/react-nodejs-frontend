import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showPage, hidePage } from './common/CommonActions'
import { Row, Col, Grid, Button } from 'react-bootstrap';
import TopBar from 'common/TopBar'
import SideBar from 'common/SideBar'
import NavBar from 'common/NavBar'

import PropTypes from 'prop-types';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props

        var layout;

        if ((this.props.auth) && (!1)) {
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
            layout = (
                <Row>
                    <Col xs={12}>
                        <div>
                            {children}
                        </div>
                    </Col>
                </Row>);
        }

        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <NavBar/>
                    </Col>
                </Row>
                {layout}
            </Grid>
       );
    }
}

function mapStateToProps(state, ownProps) {

    var authenticated = true;
    if (state.entities && state.entities.user && state.entities.user.accessToken) {
        authenticated = true;
    } else {
        authenticated = false;
    }

    return {
        show: state.config.page?true:false,
        auth: authenticated,
        showPage: PropTypes.func.isRequired,
        hidePage: PropTypes.func.isRequired,
    }
}

export default connect(mapStateToProps, {
    showPage, hidePage,
})(App)
