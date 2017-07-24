import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '../common/List';

import BreadCrumb, { clearBreadcrumb, pushBreadcrumb, popBreadcrumb } from 'amplifier/BreadCrumb';

import Title from 'common/Title';
import { getCategory } from './NodeActions'

import { decodeEntities } from 'common/Functions';
import '../../styles/App.less';


class NodePage extends Component {

    constructor (props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillUpdate(nextProps) {

    }
    
    componentDidMount() {
        super.componentDidMount();
        super.componentPostLoad();
    }

    renderItem(item, data, click) {


        return (<div></div>

        );
    }

    handleClick(item, e) {


        return false;
    }

    render() {


        return (
            <div className="class-NodeSelectionPage" id="NodeSelectionPage">
             TESTTEST TEST TEST
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
    }
}

 export default connect(mapStateToProps, {  }) (NodePage)
