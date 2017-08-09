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

    componentDidMount() {

    }

    componentDidUpdate(){

    }

    render() {
        const { children } = this.props

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <NavBar/>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <SideBar/>
                    </Col>
                    <Col md={8}>
                        {children}
                    </Col>
                </Row>
            </Grid>
       );
    }
}

function mapStateToProps(state, ownProps) {

    return {
        show: state.config.page?true:false,
        showPage: PropTypes.func.isRequired,
        hidePage: PropTypes.func.isRequired,
    }
}

export default connect(mapStateToProps, {
    showPage, hidePage,
})(App)
