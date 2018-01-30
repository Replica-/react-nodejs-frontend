import React, { Component, PropTypes } from 'react';
import { clearBreadcrumb } from 'common/BreadCrumb';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class BreadLink extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.clearBreadcrumb();
        this.props.history.push(this.props.to);
    }

    render () {
        return (<a onClick={this.handleClick}>{this.props.children}</a>);
    };
}

const mapStateToProps = (state, ownProps) => {

    return {

    }
}

export default withRouter(connect(mapStateToProps, { clearBreadcrumb }) (BreadLink))
