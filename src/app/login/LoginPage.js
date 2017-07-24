import React, { Component} from 'react';
import { connect } from 'react-redux';

import '../../styles/App.less';



class LoginPage extends Component {

    constructor (props) {
        super(props);
    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {
        //super.componentDidMount();
        //super.componentPostLoad();
    }

    render() {
        return (
            <div className="class-LoginPage" id="LoginPage">
                <p>Form</p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
    }
}

export default connect(mapStateToProps, {  }) (LoginPage)
