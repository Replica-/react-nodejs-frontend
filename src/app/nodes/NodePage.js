import React, { Component} from 'react';
import { connect } from 'react-redux';

import '../../styles/App.less';



class NodePage extends Component {

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
            <div className="class-NodePage" style={{background:"green"}} id="NodePage">
            <p>Form</p>
            </div>
    );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
    }
}

export default connect(mapStateToProps, {  }) (NodePage)
