import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styles from './style.acss';
import { connect } from 'react-redux';
import { type } from 'common/Functions';

export class Table extends Component {
    constructor (props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }

    /**
     * Generic Header Renderer
     * @param {colName} item
     * @param {context} click
     * @param {data} className
     * @param {className} className
     *
     * @emits {Error} Type checking
     *
     * @return html item
     */
    renderItem(colName, context, data, className = "") {

        type(colName, ["string"]);
        type(context, ["object"]);
        type(data, ["string", "number"]);
        type(className, ["string"]);

        return (
            <div className={className}>
            <span>{data}</span>
            </div>
        );
    }

    /**
    * Handle click on header for sorting
    */
    handleClick() {

    }

    /**
     * Generic Header Renderer
     * @param {object} item
     * @param {function} click
     * @param {string} className
     *
     * @return html element
     */
    renderHeader(item, click, className = "left") {

        type(item, ["object"]);
        type(click, ["function"]);
        type(className, ["string"]);

        type(item.title, ["string", "number"], true);

        let i = item.title;
        return (
            <div className={styles.padding + " " + className}>{i}</div>
        );
    }

    render() {
        const { items, data, columns } = this.props;

        if ((!items) || (!data) || (items.length == 0)) {
            return null;
        }

        let groupBy = "";
        // Check column config
        for (let c = 0; c < columns.length; c++) {
            if (columns[c].rowSpan) {
                groupBy = columns[c].rowSpan;
            }

            // Pick out the first row - check if the table is actually ready for reading.

            if (typeof (data[items[0]][columns[c].id]) == "undefined") {
                return null;
            }
        }

        var flattenArray = preprocessTable(items, data, groupBy);

        return (
            <div className="table-responsive">
                <table className={"table table-bordered"}>
                    <thead><tr>
                    {this.props.columns.map(function(column, c){

                        let className = "";

                        if (column["headerClass"]) {
                            className = column["headerClass"];
                        }

                        return (<th className={styles.th} key={c}>{this.renderHeader(column, this.props.handleClick, className)}</th>);
                    }.bind(this))}
                    </tr>
                    </thead>
                    <tbody>

                        {flattenArray.map(function(context, i){

                            // No columns defined
                            if (typeof context == "undefined") {
                                return [];
                            }
                            return (<tr className={context.stripeRow?"style-striped "+ styles.stripe:""} key={i}>
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

/*
* Preprocess Table
*
* This function resolves items x data into single array, if a group by is not empty, the groupby object is flattened
* into the array adding additional rows.
*
* @param {array} items - The indexes to be rendered
* @param {object} data - The json data to be rendered.
* @param string groupby - The first level "object" to group by. Default is false.
*
* @return {array} A flattened down array
*/
const preprocessTable = (items, data, groupBy = null) => {

    type(items, "array");
    type(data, "object");
    type(groupBy, "string", true);

    var flattenArray = [];

    // If we are not grouping by another dataset, simply resolve array
    if (groupBy == false) {
        for (var i = 0; i < items.length; i++) {
            const context = data[items[i]];
            var stripeRow = i%2;
            context.stripeRow = true;
            flattenArray.push(context);
        }
    } else {
        // Preprocess the table in order to get it in the correct format for rendering
        for (var i = 0; i < items.length; i++) {
            var stripeRow = i%2;

            const context = data[items[i]];
            // Resolve group by in context
            if (context[groupBy]) {

                // Copy the group by object and create a new row for each copy
                for (var j = 0; j < context[groupBy].length; j++) {
                    let object2 = Object.assign({}, context);
                    object2 = Object.assign(object2, context[groupBy][j]);

                    // Dont render flag is specifically for rows that have repeat data.
                    if (j != 0) {
                        object2.dontRender = true;
                    }

                    object2.stripeRow = stripeRow;

                    flattenArray.push(object2);
                }
            }
        }
    }

    return flattenArray;
}

const mapStateToProps = (/*state, ownProps*/) => {

    return {

    }
}

Table.propTypes = {
    handleClick: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired
}

export default connect(mapStateToProps, { }) (Table)
