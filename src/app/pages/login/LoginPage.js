import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PageComponent }  from 'common/Page';
import LoginForm from './LoginForm'
import { Row, Col, Grid, Button, Nav, NavItem, ButtonToolbar } from 'react-bootstrap';

import { SubmissionError } from 'redux-form';

import { authenticate, obtainToken } from './LoginActions'

class LoginPage extends Component {

    constructor (props) {
        console.error(props);
        super(props);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleValidate (form, dispatch) {
        console.error("Handle validate");

        // Attempt to authenticate
        return dispatch(authenticate(form.email, form.password)).then(result => {

            if (result.type == "AUTH_SUCCESS"){

                return this.props.obtainToken().then(result => {
                    if (result.type == "TOKEN_SUCCESS"){
                        // We should redirect now
                        this.props.history.push("/nodes");
                    } else {
                        throw new SubmissionError({
                            email: 'User or password is incorrect',
                            _error: 'Login failed!',
                        });
                    }
                });

            } else {
                throw new SubmissionError({
                    email: 'User or password is incorrect',
                    _error: 'Login failed!',
                });
            }

        });

        return false;
    }

    async showResults (values) {
        console.error("Handle Submit");

    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="justify-content-md-center">
                <Col xs={10} sm={10} xsOffset={1} md={10}>
                    <LoginForm onSubmit={this.showResults} onValidate={this.handleValidate} />
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {

    }
}

export default connect(mapStateToProps, { authenticate, obtainToken }) (PageComponent(LoginPage))
