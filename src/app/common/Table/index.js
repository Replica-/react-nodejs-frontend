import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { PageComponent }  from 'common/Page';
import styles from './style.acss';
import { connect } from 'react-redux';

export class Table extends Component {
    constructor (props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.renderHeader = this.renderHeader.bind(this);

    }

    // Generic Item Renderer - Can be overriden
    renderItem(colName, context, data, className = "") {

        if (typeof(data) == "object") {
            throw new Error("Item renderer received object, expecting a primative type");
        }

        return (
            <div className={className}>
            <span>{data}</span>
            </div>
        );
    }

    handleClick() {

    }

    // Generic Header Renderer
    renderHeader(item, click, className = "left") {
        let i = item.title;
        return (
            <div className={styles.padding + " " + className}>{i}</div>
        );
    }

    render() {

        const { items, data, columns } = this.props;

        let groupBy = "";
        // Check column config
        for (let c = 0; c < columns.length; c++) {
            if (columns[c].rowSpan) {
                groupBy = columns[c].rowSpan;
                break;
            }
        }

        var flattenArray = preprocessTable(items, data, groupBy);

        return (
            <div className="table-responsive">
                <table className={"table table-bordered"}>
                    <thead>
                    {this.props.columns.map(function(column, c){

                        let className = "";

                        if (column["headerClass"]) {
                            className = column["headerClass"];
                        }

                        return (<th key={c}>{this.renderHeader(column, this.props.handleClick, className)}</th>);
                    }.bind(this))}
                    </thead>
                    <tbody>

                        {flattenArray.map(function(context, i){

                            return (<tr key={i}>
                                    {this.props.columns.map(function(colValue, c){

                                        if (context.dontRender && colValue.rowSpan) {
                                            return null;
                                        }

                                        const column = colValue.id;

                                        let className = "";

                                        if (colValue.itemClass) {
                                            className = colValue.itemClass;
                                        }

                                        let rowSpan = 1;
                                        if (colValue.rowSpan) {
                                            rowSpan = context[colValue.rowSpan].length;
                                        }

                                        const itemValue = context[colValue.id];

                                        let renderItem = this.renderItem;

                                        if (typeof colValue.render == "function") {
                                            renderItem = colValue.render;
                                        }

                                        if (typeof itemValue == "undefined" ) {
                                            return (<td key={i + "_" + c}></td>);
                                        } else {
                                            return (<td rowSpan={rowSpan} className={className} key={i + "_" + c}>{renderItem(column , context, itemValue)}</td>);
                                        }

                                    }.bind(this))}
                                </tr>);
                        }.bind(this))}

                    </tbody>
                </table>
            </div>
        )
    }
}
Table.propTypes = {
    handleClick: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
}

Table.defaultProps = {

}


const preprocessTable = (items, data, groupBy) => {
    var flattenArray = [];

    // If we are not grouping by another dataset, copy array as is.
    if (groupBy == false) {
        for (var i = 0; i < items.length; i++) {
            const context = data[items[i]];
            flattenArray.push(context);
        }
    } else {

        // Preprocess the table in order to get it in the correct format for rendering
        for (var i = 0; i < items.length; i++) {
            const context = data[items[i]];
            if (context[groupBy]) {
                for (var j = 0; j < context[groupBy].length; j++) {
                    let object2 = Object.assign({}, context);
                    object2 = Object.assign(object2, context[groupBy][j]);
                    if (j != 0) {
                        object2.dontRender = true;
                    }
                    flattenArray.push(object2);
                }
            }
        }
    }

    return flattenArray;
}

const mapStateToProps = (state, ownProps) => {

    return {

    }
}

export default connect(mapStateToProps, { }) (Table)
