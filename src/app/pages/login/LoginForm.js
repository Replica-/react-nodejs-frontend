import React from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = props => {
    const { error, handleSubmit, pristine, /*reset,*/ submitting, onValidate } = props;

    return (
        <div className="login-panel panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Please Sign In</h3>
            </div>

            <div className="panel-body">
                {!submitting && error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit(onValidate)}>
                    <fieldset>
                        <div className="form-group">
                            <Field component="input" className="form-control" placeholder="E-mail" id="email" name="email" type="email" autoFocus/>
                        </div>

                        <div className="form-group">
                            <Field component="input" className="form-control" placeholder="Password" id="password" name="password" type="password" value=""/>
                        </div>

                        <div className="checkbox">
                            <label>
                                <Field component="input" name="remember" type="checkbox" value="Remember Me"/>Remember Me
                            </label>
                        </div>

                        <button type="submit" className="btn btn-lg btn-success btn-block" disabled={pristine || submitting}>Login</button>

                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default reduxForm({
    form: 'login',
})(LoginForm);
