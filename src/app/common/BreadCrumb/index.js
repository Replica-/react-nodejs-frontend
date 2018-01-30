import React, { Component, PropTypes } from 'react'
import { decodeEntities } from 'common/Functions';
import styles from './style.acss';
export * from './actions';
//import { BCLink } from './Link';

export class BreadCrumb extends Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i, j, items){

        // React router doesn't component Mount and unmount when the route id is slightly different so we need to include some hacks for it work
        this.props.popBreadcrumb(j);
        this.props.history.push(items[i][0]);
    }

    render() {
        if (this.props.stackItems.length < 0) return null;

        var stackHtml = this.props.stackItems.slice(0,this.props.stackItems.length).map((stack, i) =>
            <a className="toro-breadcrumb" key={this.props.stackItems.length-i} onClick={this.handleClick.bind(this, i, this.props.stackItems.length-i, this.props.stackItems)}>
                <div className={styles.toroCrumbs}>

                    {[...Array(this.props.stackItems.length-(i))].map((x, j) =>
                        <span key={j} className="fa fa-caret-right"></span>
                    )}

                </div>
                <div dangerouslySetInnerHTML={{__html:(typeof stack == 'string')?stack:stack[1]}} className={styles.toroBread}>

                </div>
            </a>
        );

        return (
            <div className={styles.toroWrap}>
                {stackHtml}
            </div>
        )
    }
}

BreadCrumb.propTypes = {

}

BreadCrumb.defaultProps = {

}

export default BreadCrumb;