import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from './common/CommonActions'
import { safe } from './common/Functions'
import { Row, Col } from 'react-bootstrap';
import NavBar from 'common/NavBar'
import SideBar from 'common/SideBar'
import BreadCrumb, { popBreadcrumb } from 'common/BreadCrumb'

export class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { children, show } = this.props

        const bc = <BreadCrumb stackItems={this.props.stack} history={this.props.history} popBreadcrumb={this.props.popBreadcrumb}/>

        let layout;

        if (this.props.auth) {
            layout = (
                <Row>
                <Col xs={12} sm={3}>
                    <SideBar history={this.props.history}/>
                </Col>
                <Col xs={12} sm={9}>
                    <Row>
                    <Col xs={12}>
                        {(this.props.stack.length > 0)?bc:null}
                    </Col>
                    </Row>

                    {children}
                </Col>
                </Row>
            );
        } else {
           layout =(<Row>
            <Col xs={12}>
                {children}
                </Col>
            </Row>);
        }

        return (
            <div>
                {show?<div className="loadingSpinner"><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>Loading</div>:null}
                <Row>
                    <Col xs={12}>
                        <NavBar showAuthenticated={this.props.auth}/>
                    </Col>
                </Row>
                {layout}
            </div>
       );
    }
}

function mapStateToProps(state/*, ownProps*/) {

    const authenticated = safe(state.user, ["accessToken"], false);

    return {
        stack: (state.config.stack || []),
        show: state.config.show_loading?true:false,
        auth: authenticated
    }
}

export default connect(mapStateToProps, {
    showLoading, hideLoading, popBreadcrumb
})(App)
