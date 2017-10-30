import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PageComponent }  from 'common/Page';
import LoginForm from './LoginForm'
import { Row, Col, Grid, Button, Nav, NavItem, ButtonToolbar } from 'react-bootstrap';

class LoginPage extends Component {

    constructor (props) {
        super(props);
    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {

    }

    render() {
        return (

                <div className="justify-content-md-center">
                    <Col xs={12} smOffset={5} sm={6} mdOffset={0} md={12}>
                        <LoginForm/>
                    </Col>
                </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
    }
}

export default connect(mapStateToProps, {  }) (PageComponent(LoginPage))
