import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PageComponent }  from 'common/Page';
import LoginForm from './LoginForm'
import { Row, Col, Grid, Button, Nav, NavItem, ButtonToolbar } from 'react-bootstrap';

import { SubmissionError } from 'redux-form';

import { authenticateUser } from './LoginActions'



class LoginPage extends Component {

    onValidate (form, dispatch) {
        // Attempt to authenticate
        return dispatch(authenticateUser(form.email, form.password)).then(result => {

            if (result.type == "TOKEN_SUCCESS"){
                resolve();
            } else {
                throw new SubmissionError({
                    email: 'User or password is incorrect',
                    _error: 'Login failed!',
                });
            }
        });
    }

    constructor (props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit (values) {
        this.props.submitSearch(this.props.formValues.search.values);
    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="justify-content-md-center">
                <Col xs={12} smOffset={5} sm={6} mdOffset={0} md={12}>
                    <LoginForm onSubmit={this.onSubmit} onValidate={this.onValidate} />
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
    }
}

export default connect(mapStateToProps, { authenticateUser }) (PageComponent(LoginPage))
