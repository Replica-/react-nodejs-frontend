import React, { Component} from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'common/ProgressBar';
import { PageComponent }  from 'common/Page';
import { safe/*, type*/ } from 'common/Functions';
import { Table } from 'common/Table';
import { Icon } from 'common/Icon';
import PropTypes from 'prop-types';
import { showLoading, hideLoading } from 'common/CommonActions'
import { inputChange, fetchStudents, fetchQuestPaths } from './SplashActions'

class SplashPage extends Component {

    constructor (props) {
        super(props);

        this.renderQuest = this.renderQuest.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    componentDidMount() {

        this.props.showLoading();

        this.props.fetchQuestPaths().then(result => {
            if (result.type == "STUDENT_QUESTPATHS_SUCCESS") {
                return this.props.fetchStudents();
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
     * Custom Item Renderer - Submit Column
     * @param item
     * @param context
     *
     * @return html item
     */
    renderSubmit(item, context) {
        return (<Icon type="boolean" value={context.mark.submitted}/>);
    }

    /**
     * Custom Item Renderer - Active Column
     * @param item
     * @param context
     *
     * @return html item
     */
    renderActive(item, context) {

        return (<Icon type="boolean" value={context.quest.isActive}/>);
    }

    /**
     * Custom Item Renderer - Completion
     * @param item
     * @param context
     *
     * @return html item
     */
    renderCompletion(item, context) {

        let mark = context.mark.completion;
        if (!mark) {
            mark = 0;
        }

       return  (
           <ProgressBar mark={mark}/>
        );
    }

    /**
     * Custom Item Renderer - Mark Column
     * @param item
     * @param context
     *
     * @return html item
     */
    renderMark(item, context) {

        let mark = context.mark.mark;
        if (!mark) {
            mark = 0;
        }

        let markColour = "default";

        if (mark > 80) {
            markColour = "green";
        } else if (mark > 65) {
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
                    <p className={markColour}>{mark}%</p>
            </div>);
    }

    /**
     * Custom Item Renderer - Quest Column
     * @param item
     * @param context
     *
     * @return html item
     */
    renderQuest(item, context) {
        return (
            <div>
               <p>{context.quest.name}</p>
            </div>
        );
    }

    /**
     * Handle Click - Placeholder for header clicks
     */
    handleClick() {

    }

    onTextChange() {
        this.props.inputChange(this.refs.input.value);
    }

    render() {

        // Future: Expand id to handle more complicated array path definitions. eg. id: quest.submitted
        let columnsSpec = [{id: "id", title: "Student ID", itemClass: "middle", rowSpan: "questPaths"},
                           {id: "fullname",title: "Full Name", itemClass: "middle", rowSpan: "questPaths"},
                           {id: "questPaths",title: "Quest Name", render: this.renderQuest},
                           { id: "id", title: "Quest Submitted?", itemClass: "middle",headerClass: "center", render: this.renderSubmit},
                           { id: "id", title: "Quest Completion", itemClass: "middle center",headerClass: "center", render: this.renderCompletion},
                           { id: "id", title: "Quest Mark", itemClass: "middle", headerClass: "center", render: this.renderMark},
                           { id: "id", title: "Quest Active?", itemClass: "middle", headerClass: "center", render: this.renderActive}];
        return (
                <div>
                    <Table striped={true} columns={columnsSpec} items={this.props.students} data={this.props.studentData} handleClick={this.handleClick}/>
                </div>
        );
    }

}

const mapStateToProps = (state) => {

    let students = safe(state.entities,[ "student" ], {});


    return {
        title: "Students",
        students: Object.keys(students),
        studentData: students,
        hideLoading: PropTypes.func.isRequired,
        showLoading: PropTypes.func.isRequired,
        inputChange: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, { showLoading, hideLoading, fetchStudents, fetchQuestPaths, inputChange }) (PageComponent(SplashPage))