import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PageComponent }  from 'common/Page';
import LoginForm from './LoginForm'
import { Row, Col, Grid, Button, Nav, NavItem, ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './style.acss';

import { SubmissionError } from 'redux-form';

import { authenticate, fetchToken } from './LoginActions'
import { showLoading, hideLoading } from 'common/CommonActions'


class LoginPage extends Component {

    constructor (props) {

        super(props);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleValidate (form, dispatch) {
        dispatch(showLoading());

        // Attempt to authenticate
        return dispatch(authenticate(form.email, form.password)).then(result => {

            if (result.type == "AUTH_SUCCESS"){

                return this.props.fetchToken().then(result => {
                    if (result.type == "TOKEN_SUCCESS"){
                        // We should redirect now
                        this.props.history.push("/nodes");
                    } else {
                        throw new SubmissionError({
                            email: 'User or password is incorrect',
                            _error: 'Login failed!',
                        });
                    }
                }).catch(error => { console.error(error); this.props.hideLoading(); throw error;});

            } else {
                throw new SubmissionError({
                    email: 'User or password is incorrect',
                    _error: 'Login failed!',
                });
            }
        }).catch(error => { console.error(error); this.props.hideLoading(); throw error;});

        return false;
    }

    async showResults (values) {

    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={styles.root} >
                <Col xs={12} sm={12} md={12}>
                    <LoginForm onSubmit={this.showResults} onValidate={this.handleValidate} />
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        showLoading: PropTypes.func.isRequired,
        hideLoading: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, { showLoading, hideLoading, authenticate, fetchToken }) (PageComponent(LoginPage))
