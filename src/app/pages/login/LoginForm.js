import React from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
            /*
        <form onSubmit={handleSubmit}>
        <div>
        <label>Email</label>
    <div>
    <Field
    name="email"
    component="input"
    type="text"
    placeholder="Email"
        />
        </div>
        </div>


        <div>
        <label>Password</label>
    <div>
    <Field
    name="password"
    component="input"
    type="text"
    placeholder="Password"
        />
        </div>
        </div>

        <div>
        <label>Remember Password</label>
    <div>
        <Field
    name="employed"
    id="employed"
    component="input"
    type="checkbox"
        />
        </div>
        </div>

        <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
    <button type="button" disabled={pristine || submitting} onClick={reset}>
        Clear Values
    </button>
    </div>
*/

        <div className="login-panel panel panel-default">
        <div className="panel-heading">
        <h3 className="panel-title">Please Sign In</h3>
    </div>
    <div className="panel-body">
        <form role="form">
        <fieldset>
        <div className="form-group">
        <input className="form-control" placeholder="E-mail" name="email" type="email" autoFocus/>
    </div>
    <div className="form-group">
        <input className="form-control" placeholder="Password" name="password" type="password" value=""/>
        </div>
        <div className="checkbox">
        <label>
        <input name="remember" type="checkbox" value="Remember Me"/>Remember Me
    </label>
    </div>

    <a href="index.html" className="btn btn-lg btn-success btn-block">Login</a>
        </fieldset>
        </form>

        </div>
        </div>

);
};

export default reduxForm({
    form: 'simple', // a unique identifier for this form
})(LoginForm);
