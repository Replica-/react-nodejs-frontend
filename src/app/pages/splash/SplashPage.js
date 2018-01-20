import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PageComponent }  from 'common/Page';
import { Row, Col, Grid, Button, Nav, NavItem, ButtonToolbar } from 'react-bootstrap';
import { safe } from 'common/Functions';
import { Table } from 'common/Table';
import PropTypes from 'prop-types';
import { showLoading, hideLoading } from 'common/CommonActions'
import { fetchStudents, fetchQuestPaths } from './SplashActions'

class SplashPage extends Component {

    constructor (props) {
        super(props);

        this.renderQuest = this.renderQuest.bind(this);
    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {

        this.props.showLoading();

        this.props.fetchStudents().then(result => {
            if (result.type == "STUDENT_SUCCESS") {
                this.props.fetchQuestPaths().then(result => {
                   // The interface should render straight away
                    this.props.hideLoading();
                }).catch(error => { console.error(error); this.props.hideLoading();});
            }
        }).catch(error => { console.error(error); this.props.hideLoading();});
    }

    renderSubmit(item, context, value) {

        let mark = context.mark.submitted;
        if (mark) {
            mark = (<p  className="glyphicon glyphicon-ok-circle"></p>);
        } else {
            mark = (<p  className="glyphicon glyphicon-remove-circle"> </p>);
        }

        return (<div className="center">
                {mark}
            </div>);
    }

    renderCompletion(item, context, value) {

                let mark = context.mark.completion;
                if (!mark) {
                    mark = 0;
                }

               return  (<div className='progress-bar'
                role='progressbar'
                aria-valuenow={mark}
                aria-valuemin='0'
                aria-valuemax='100'
                style={{width:  mark + '%'}}>
                    <p className=''>{mark}%</p>
                </div>
                );

    }

    renderMark(item, context, value) {

        let mark = context.mark.mark;
        if (!mark) {
            mark = 0;
        }

        let markColour = "default";

        if (mark > 80) {
            markColour = "green";
        } else if (mark > 60) {
            markColour = "gold";
        } else if (mark > 40) {
            markColour = "orange";
        } else if (mark == 0) {
            markColour = "default";
        } else {
            markColour = "darkgrey";
        }

        return (
            <div className="center">
                    <p className={markColour}>{mark}</p>
            </div>);
    }

    renderQuest(item, context, value) {

        return (
            <div className="csr-listview-item">
                   <p>{context.quest.name}</p>
            </div>
        );
    }

    handleClick() {

    }

    render() {

        let columnsSpec = [{id: "id", title: "Student ID", itemClass: "middle", rowSpan: "questPaths"},
                           {id: "fullname",title: "Full Name", itemClass: "middle", rowSpan: "questPaths"},
                           {id: "questPaths",title: "Quest Name", render: this.renderQuest},
                           { id: "id", title: "Quest Submitted?", headerClass: "center", render: this.renderSubmit},
                           { id: "id", title: "Quest Completion", headerClass: "center", render: this.renderCompletion},
                           { id: "id", title: "Quest Mark", headerClass: "center", render: this.renderMark} ];

        return (
            <Table columns={columnsSpec} items={this.props.students} data={this.props.studentData} handleClick={this.handleClick}/>
        );
    }

}

const mapStateToProps = (state, ownProps) => {

    let students = safe(state.entities,[ "student" ], {});

    return {
        students: Object.keys(students),
        studentData: students,
        hideLoading: PropTypes.func.isRequired,
        showLoading: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, { showLoading, hideLoading, fetchStudents, fetchQuestPaths }) (PageComponent(SplashPage))