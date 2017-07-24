import React, { Component, PropTypes } from 'react'
import styles from './style.css';

export class Grid extends Component {
    render() {

        if ((typeof this.props.items == 'undefined') || (this.props.items.length == 0)) {
            return null;
        }

        return (
            <div itemProp="body" className={"GridComponent "}>
                <div className={styles.gridWrap}>
                    {this.props.items.map(function(item){
                        return (<div className={styles.gridCell} onClick={(event) => this.props.onClick(item, event)}>
                                    {this.props.itemRenderer(item, this.props.data, this.props.handleClick)}
                                </div>);
                    }.bind(this))}
                </div>
            </div>
        );
    }
}

Grid.propTypes = {
    itemRenderer: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    items: PropTypes.array,
    data: PropTypes.object.isRequired,
}

Grid.defaultProps = {
    isFetching: true,
}

export default Grid