import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import List from '../common/List';
import PortholeComponent from '../common/PortholeComponent';

import BreadCrumb, { clearBreadcrumb, pushBreadcrumb, popBreadcrumb } from 'amplifier/BreadCrumb';

import Title from 'common/Title';
import { getCategory } from './NodeActions'

import { decodeEntities } from 'common/Functions';
import '../../styles/System.less';

class SystemSelectionPage extends PortholeComponent {

    constructor (props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillUpdate(nextProps) {
        if ((typeof nextProps.params.categoryId == 'undefined') && (typeof this.props.params.categoryId != 'undefined')){
            this.props.clearBreadcrumb();
            this.props.getCategory("");

        } else {
            if (nextProps.params.categoryId != this.props.params.categoryId) {

                this.props.pushBreadcrumb("systems/" + nextProps.params.categoryId, nextProps.categoryData[nextProps.params.categoryId + ""]["attributes"]["title"]);
                this.props.getCategory(nextProps.params.categoryId);
            }
        }
    }
    
    componentDidMount() {

        if (typeof this.props.params.categoryId == 'undefined') {

            this.props.clearBreadcrumb();


            return;

        } else {
            if (this.props.stack[this.props.stack.length-1] != this.props.params.categoryId) {
                //this.props.clearBreadcrumb();
                this.props.pushBreadcrumb("systems/" + this.props.params.categoryId, this.props.categoryData[this.props.params.categoryId + ""]["attributes"]["title"]);
                this.props.getCategory(this.props.params.categoryId);
            } else {

            }
        }

        super.componentDidMount();
        super.componentPostLoad();
    }

    renderItem(item, data, click) {
        let category = data[item].attributes;
        var pageNo = "";
        if (typeof category.pageNo != "undefined") {
            pageNo = (<span className='csr-listview-title' style={{color: 'grey', width:'40px'}}>{category.pageNo}</span>);
        } else {
            pageNo = (<span className="csr-listview-icon" style={{width:"30px"}}></span>);
        }

        return (
        <li className="csr-listview-item" onClick={(event) => click(item, event)} key={item}>
            <a href="#" className="csr-listview-link ui-link" rel="external">
                <span className="csr-listview-title"><div dangerouslySetInnerHTML={{__html: decodeEntities(category.title)}}></div></span>
                {pageNo}

            </a>
        </li>
        );
    }

    handleClick(item, e) {
        if (this.props.categoryData[item].attributes.type == "content") {
            window.react.history.push("content/" + item);
        }

        if (this.props.categoryData[item].attributes.type == "system") {
            window.react.history.push("system/" + item);
        }

        if ((this.props.categoryData[item].attributes.type == "category") || (this.props.categoryData[item].attributes.type == "systems") || (this.props.categoryData[item].attributes.type == "subcategory")){
            window.react.history.push("systems/" + item);
        }
        e.stopPropagation();

        return false;
    }

    render() {

        var listHtml = null;
        if (this.props.categories != null) {
            listHtml = (<List handleClick={this.handleClick} items={this.props.categories} data={this.props.categoryData} itemRenderer={this.renderItem}/>);
        }

        var breadCrumb = null;
        if (this.props.categoryData)
            breadCrumb = <BreadCrumb stackItems={this.props.stack} categoryData={this.props.categoryData} popBreadcrumb={this.props.popBreadcrumb}/>;

        var titleNode = null;
        if (this.props.currentCategory != null) {
            titleNode = <Title title={this.props.currentCategory.title}/>;
        }

        var description = null;
        if ((this.props.currentCategory != null) && (this.props.currentCategory.html != null)) {
            if (this.props.currentCategory.html) {
                if (this.props.currentCategory.html.type != "Buffer") {
                    description = ( <div className="csr-title-text-full-width bg-white">
                        <div className="csr-title-text-wrap">
                            <p dangerouslySetInnerHTML={{__html: this.props.currentCategory.html}}></p>
                        </div>
                    </div>);
                }

            }
        }

        return (
            <div className="class-SystemSelectionPage" id="SystemSelectionPage">
                {breadCrumb}
                {titleNode}
                {description}
                {listHtml}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    var categories = null;
    if (state.entities.category) {
        categories = Object.keys(state.entities.category);
    }

    if (ownProps.params.categoryId) {
        categories = state.entities.categories[ownProps.params.categoryId];
    } else {
        if (state.entities.categories)
            categories = state.entities.categories[""];
    }

    var currentCategory = null;
    if (ownProps.params.categoryId) {
        try {
            currentCategory = state.entities.category[parseInt(ownProps.params.categoryId)].attributes;
        } catch (error) {
            window.react.history.push("/");
            currentCategory = null;
        }

    } else {
        if (state.entities.category)
            if (state.entities.category[""])
            currentCategory = state.entities.category[""].attributes;
    }

    return {
        stack: state.page.stack,
        currentCategory: currentCategory,
        getCategory: PropTypes.func.isRequired,
        pushBreadcrumb: PropTypes.func.isRequired,
        clearBreadcrumb: PropTypes.func.isRequired,
        stack: state.page.stack || [],
        categories: categories,
        categoryData: state.entities.category
    }
}

 export default connect(mapStateToProps, { getCategory, pushBreadcrumb, clearBreadcrumb, popBreadcrumb }) (SystemSelectionPage)
