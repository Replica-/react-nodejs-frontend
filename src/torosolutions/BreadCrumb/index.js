import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { decodeEntities } from 'common/Functions';
export * from './actions'

export class BreadCrumb extends Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i, j, items){
        // React router doesn't component Mount and unmount when the route id is slightly different so we need to include some hacks for it work
        if (items.length <= 3) {
            this.props.popBreadcrumb(j);
        } else {
            this.props.popBreadcrumb(j);
        }

        window.react.history.push(items[i][0]);
    }

    render() {
        if (this.props.stackItems.length <= 1) return null;

        var stackHtml= this.props.stackItems.slice(0,this.props.stackItems.length-1).map((stack, i) =>
            <a className="csr-breadcrumb" ref="breadCrumb" key={this.props.stackItems.length-i} onClick={this.handleClick.bind(this, i, this.props.stackItems.length-i, this.props.stackItems)}>
                <div className="csr-crumbs">

                    {[...Array(this.props.stackItems.length-(i+1))].map((x, j) =>
                        <span key={j} className="ui-icon ui-icon-caret-left"></span>
                    )}

                </div>
                <div dangerouslySetInnerHTML={{__html:(typeof stack == 'string')?stack:decodeEntities(stack[1])}} className="csr-bread">

                </div>
            </a>
        );

        return (
            <div className={"csr-breadcrumb-wrap csr-color-" + this.props.stackItems[0][2]}>
                {stackHtml}
            </div>
        )
    }
}

BreadCrumb.propTypes = {
    stackItems: PropTypes.array.isRequired,
    categoryData: PropTypes.object.isRequired
}

BreadCrumb.defaultProps = {

}

export default BreadCrumb;