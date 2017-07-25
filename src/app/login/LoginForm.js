import React from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
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
    </form>
);
};

export default reduxForm({
    form: 'simple', // a unique identifier for this form
})(LoginForm);
