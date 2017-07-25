import React, { Component} from 'react';
import { connect } from 'react-redux';

import '../../styles/App.less';
import LoginForm from './LoginForm'


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
            <div className="class-LoginPage" style={{background:"red"}} id="LoginPage">
                <LoginForm/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
    }
}

export default connect(mapStateToProps, {  }) (LoginPage)
