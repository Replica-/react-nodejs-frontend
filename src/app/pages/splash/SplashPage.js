import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PageComponent }  from 'common/Page';
import { Row, Col, Grid, Button, Nav, NavItem, ButtonToolbar } from 'react-bootstrap';

import { fetchStudents, fetchQuestPaths } from './SplashActions'

class SplashPage extends Component {

    constructor (props) {
        super(props);
    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {

        this.props.fetchStudents().then(result => {
            if (result.type == "STUDENT_SUCCESS") {
                this.props.fetchQuestPaths().then(result => {
                   // The interface should render straight away
                });
            }
        });
    }

    render() {
        return (
                            <div className="table-responsive">
                            <table className="table table-striped">
                            <thead>
                            <tr>
                            <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>twitter</td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {

    }
}

export default connect(mapStateToProps, { fetchStudents, fetchQuestPaths }) (PageComponent(SplashPage))