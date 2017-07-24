import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class List extends Component {
    render() {
        return (
            <div className="ListComponent">
                <ul className="csr-listview">
                    {this.props.items.map(function(listValue){
                        return this.props.itemRenderer(listValue, this.props.data, this.props.handleClick);
                    }.bind(this))}
                </ul>
            </div>
        )
    }
}

List.propTypes = {
    itemRenderer: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
}

List.defaultProps = {
    isFetching: true,
    loadingLabel: 'Loading...'
}

export default List
