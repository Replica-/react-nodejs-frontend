import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'common/CommonActions'
import { safe } from 'common/Functions'
import { PageComponent }  from 'common/Page';
import { fetchOrgs, ORG_FETCH_SUCCESS } from './actions'
import { Table } from 'common/Table';
import PropTypes from 'prop-types';

import { pushBreadcrumb, popBreadcrumb } from 'common/BreadCrumb';

export class OrganisationListPage extends Component {

    constructor (props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount() {

        this.props.showLoading();

        this.props.fetchOrgs().then(result => {
            if (result.type == ORG_FETCH_SUCCESS) {
            Promise.resolve();
            //return this.props.fetchStudents();
        } else {
            this.props.hideLoading();
            Promise.reject();
        }
    }).then((result,error) => {
            // The interface should render straight away
            this.props.hideLoading();
        Promise.resolve();

    }).catch(error => { console.error(error); this.props.hideLoading(); throw error;});

    }

    /**
     * Handle Click - Placeholder for header clicks
     */
    handleClick() {

    }


    /**
     * Handle Item Click - Stub for item click
     */
    handleItemClick(event, item) {
        this.props.pushBreadcrumb(this.props.history.location.pathname, this.props.title);
        this.props.history.push("organisations/" + item.id);
    }

    render() {

        // Future: Expand id to handle more complicated array path definitions. eg. id: quest.submitted
        let columnsSpec = [{id: "id", title: "Branch ID", itemClass: "middle", itemClick: this.handleItemClick},
            {id: "name",title: "Branch Name", itemClass: "middle"}];

        return (<div>
            <Table striped={false} columns={columnsSpec} items={this.props.items} data={this.props.data} handleClick={this.handleClick}/>
    </div>
    );
    }
}

const mapStateToProps = (state) => {

    let data = safe(state.entities,[ "org" ], {});

    return {
        title: "Organisations",
        items: Object.keys(data),
        data: data,
        hideLoading: PropTypes.func.isRequired,
        showLoading: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, { showLoading, hideLoading, fetchOrgs, pushBreadcrumb }) (PageComponent(OrganisationListPage))
