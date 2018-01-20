import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PageComponent }  from 'common/Page';
import { Row, Col, Grid, Button, Nav, NavItem, ButtonToolbar } from 'react-bootstrap';
import { safe } from 'common/Functions';
import { Table } from 'common/Table';

import { fetchStudents, fetchQuestPaths } from './SplashActions'

class SplashPage extends Component {

    constructor (props) {
        super(props);

        this.renderQuest = this.renderQuest.bind(this);
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

    renderMark(item, context, value) {

        return (
            <div className="center">
                {value.map(function(questPath, q){

                    let mark = questPath.mark.mark;
                    if (!mark) {
                        mark = 0;
                    }

                    return (<p key={q}>{mark}</p>);
                }.bind(this))}
            </div>);
    }

    renderQuest(item, context, value) {

        return (
            <div className="csr-listview-item">
                    {value.map(function(questPath, q){
                        return (<p key={q}>{questPath.quest.name}</p>);
                    }.bind(this))}
            </div>
        );
    }

    handleClick() {

    }

    render() {

        let columnsSpec = [{id: "id", title: "Student ID"},
                           {id: "fullname",title: "Full Name"},
                           {id: "questPaths",title: "Quest Name", render: this.renderQuest},
                           { id: "questPaths", title: "Quest Mark", headerClass: "center", render: this.renderMark}];

        return (
            <Table columns={columnsSpec} items={this.props.students} data={this.props.studentData} handleClick={this.handleClick}/>
        );
    }

}

const mapStateToProps = (state, ownProps) => {

    let students = safe(state.entities,[ "student" ], {});

    return {
        students: Object.keys(students),
        studentData: students
    }
}

export default connect(mapStateToProps, { fetchStudents, fetchQuestPaths }) (PageComponent(SplashPage))