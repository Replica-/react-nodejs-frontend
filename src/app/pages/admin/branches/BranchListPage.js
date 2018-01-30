import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'common/CommonActions'
import { safe } from 'common/Functions'
import { PageComponent }  from 'common/Page';
import { fetchBranches } from './BranchListActions'
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
            {id: "name",title: "Branch Name", itemClass: "middle"}];

        /*

         <button type="button" class="btn btn-default btn-circle"><i class="fa fa-check"></i>
         </button>
         <button type="button" class="btn btn-primary btn-circle"><i class="fa fa-list"></i>
         </button>
         <button type="button" class="btn btn-success btn-circle"><i class="fa fa-link"></i>
         </button>
         <button type="button" class="btn btn-info btn-circle"><i class="fa fa-check"></i>
         </button>
         <button type="button" class="btn btn-warning btn-circle"><i class="fa fa-times"></i>
         </button>
         <button type="button" class="btn btn-danger btn-circle"><i class="fa fa-heart"></i>
         </button>
         */

        return (<div>
                <div>

                </div>

            <Table striped={false} columns={columnsSpec} items={this.props.branches} data={this.props.branchData} handleClick={this.handleClick}/></div>
        );
    }
}

const mapStateToProps = (state) => {

    let branches = safe(state.entities,[ "branch" ], {});

    console.error(branches);

    return {
        title: "Branches",
        branches: Object.keys(branches),
        branchData: branches,
        hideLoading: PropTypes.func.isRequired,
        showLoading: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, { showLoading, hideLoading, fetchBranches, pushBreadcrumb }) (PageComponent(BranchListPage))
