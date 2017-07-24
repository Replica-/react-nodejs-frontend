import React, { Component} from 'react';
import { connect } from 'react-redux';

import '../../styles/App.less';



class LoginPage extends Component {

    constructor (props) {
        super(props);
        console.error(props);
    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {
        //super.componentDidMount();
        //super.componentPostLoad();
    }

    render() {
        return (
            <div className="class-LoginPage" style={{background:"red"}} id="LoginPage">
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
