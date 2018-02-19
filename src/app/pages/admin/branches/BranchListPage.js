import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'common/CommonActions'
import { safe } from 'common/Functions'
import { PageComponent }  from 'common/Page';
import { fetchBranches } from './actions'
import { Table } from 'common/Table';
import PropTypes from 'prop-types';

import { pushBreadcrumb, popBreadcrumb } from 'common/BreadCrumb';

export class BranchListPage extends Component {

    constructor (props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount() {

        this.props.showLoading();

        this.props.fetchBranches().then(result => {
            if (result.type == "BRANCHES_SUCCESS") {
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
        this.props.history.push("branches/" + item.id);
    }

    render() {

        // Future: Expand id to handle more complicated array path definitions. eg. id: quest.submitted
        let columnsSpec = [{id: "id", title: "Branch ID", itemClass: "middle", itemClick: this.handleItemClick},
            {id: "name", title: "Branch Name", itemClass: "middle"},
            {id: "organisationId", title: "Organisation", itemClass: "middle", lookup: {context:this.props.orgs, key:"name"}}
            ];

        return (<div>
                 <Table striped={false} columns={columnsSpec} items={this.props.branches} data={this.props.branchData} handleClick={this.handleClick}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    let branches = safe(state.entities,[ "branch" ], {});
    let orgs = safe(state.entities,[ "org" ], {});

    return {
        title: "Branches",
        branches: Object.keys(branches),
        branchData: branches,
        orgs: orgs,
        hideLoading: PropTypes.func.isRequired,
        showLoading: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, { showLoading, hideLoading, fetchBranches, pushBreadcrumb }) (PageComponent(BranchListPage))
