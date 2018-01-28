import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'common/CommonActions'
import { safe } from 'common/Functions'
import { PageComponent }  from 'common/Page';
import { fetchBranches } from './BranchListActions'
import { Table } from 'common/Table';
import PropTypes from 'prop-types';

export class BranchListPage extends Component {

    constructor (props) {
        super(props);
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

    render() {

        // Future: Expand id to handle more complicated array path definitions. eg. id: quest.submitted
        let columnsSpec = [{id: "id", title: "Branch ID", itemClass: "middle"},
            {id: "name",title: "Branch Name", itemClass: "middle"},
            {id: "users",title: "Branch Users"}];

        return (
            <Table striped={true} columns={columnsSpec} items={this.props.branches} data={this.props.branchData} handleClick={this.handleClick}/>
        );
    }
}

const mapStateToProps = (state) => {

    let branches = safe(state.entities,[ "branches" ], {});

    return {
        branches: Object.keys(branches),
        branchData: branches,
        hideLoading: PropTypes.func.isRequired,
        showLoading: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, { showLoading, hideLoading, fetchBranches }) (PageComponent(BranchListPage))
