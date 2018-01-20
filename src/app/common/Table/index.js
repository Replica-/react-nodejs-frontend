import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { PageComponent }  from 'common/Page';
import styles from './style.acss';

export class Table extends Component {
    constructor (props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }

    renderItem(colName, context, data) {

        if (typeof(data) == "object") {
            throw new Error("Item renderer received object, expecting a primative type");
        }

        return (
            <div className="csr-listview-item">
            <span className="csr-listview-title">{data}</span>
            </div>
        );
    }

    handleClick() {

    }
/*
 <div className="csr-listview-item" onClick={(event) => click(item, event)} key={item}>
 <span className="csr-listview-title">{i}</span>
 </div>
 */
    renderHeader(item, click, className = "left") {
        let i = item.title;
        return (
            <div className={styles.padding + " " + className}>{i}</div>
        );
    }

    render() {
        return (
            <div className="table-responsive">
                <table className={"table table-striped table-bordered table-hover"}>
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

                        {this.props.items.map(function(itemVal, i){

                            const context = this.props.data[itemVal];

                            return (<tr key={itemVal}>
                                    {this.props.columns.map(function(colValue, c){

                                        const column = colValue.id;
                                        const itemValue = this.props.data[itemVal][colValue.id];

                                        let renderItem = this.renderItem;

                                        if (typeof colValue.render == "function") {
                                            renderItem = colValue.render;
                                        }

                                        if (typeof itemValue == "undefined" ) {
                                            return (<td key={i + "_" + c}></td>);
                                        } else {
                                            return (<td key={i + "_" + c}>{renderItem(column , context, itemValue)}</td>);
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
    isFetching: true,
    loadingLabel: 'Loading...'
}

export default Table
