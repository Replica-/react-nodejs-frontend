import React, { Component, PropTypes } from 'react'
import config from 'config'
import { Provider } from 'react-redux'
import { Route, Router, IndexRoute } from 'react-router'
import { connect } from 'react-redux';

import { setHidePage, setShowPage, getUser, sendFile } from './common/PortholeActions'
import { getCategory } from './nodes/NodeActions'
import { clearBreadcrumb } from 'amplifier/BreadCrumb/actions';

import FavouritesPage from './nodes/FavouritesPage'
import SystemSelectionPage from './nodes/NodePage'
import SystemPage from './nodes/SystemPage'
import ContentPage from './nodes/ContentPage'
import SearchPage from './nodes/SearchPage'
import SearchResultPage from './nodes/SearchResultPage'
import SearchSystemResultPage from './nodes/SearchSystemResultPage'
import RedirectPage from './nodes/RedirectPage'


// Component Imports
import App from './App'

//import imagesLoaded from 'imagesloaded';

export class Root extends Component {
    constructor (props) {
        super(props);

        this.props.getUser().then((/*result*/) => {
            this.config = config;

            this.props.getCategory("").then(result => {

                if (localStorage.getItem('REACT-CSR-openOn')) {
                    if (localStorage.getItem('REACT-CSR-openOn') == "/searchResult/") {
                        window.react.history.push("search");
                    } else {
                        window.react.history.push(localStorage.getItem('REACT-CSR-openOn'));
                    }
                } else {

                }

                this.props.setShowPage();

            });
        });
    }

    componentDidMount() {

        document.getElementById("REACT-CSR").addEventListener("CUSTOMERAPP_ACTION", function(event) {

            switch (event.detail.action){

                case "REFRESH_PAGE": {
                    break;
                }

                case "CHANGE_PAGE": {
                    if ((window.react.userId == null) || (window.react.userId == "-1")) {
                        this.props.getUser().then((/*result*/) => {
                            this.config = config;
                            this.props.setShowPage();

                            if (typeof(event.detail.data.url) == 'undefined') {
                                var url = "home";
                            } else {
                                var url = event.detail.data.url.replace(this.config.UI_ROOT, "").replace("#", "");
                            }

                            this.props.clearBreadcrumb();
                            window.react.history.push(url);
                        });

                        return;
                    }


                    if (typeof(event.detail.data.url) == 'undefined') {
                        var url = "home";
                    } else {
                        var url = event.detail.data.url.replace(this.config.UI_ROOT, "").replace("#", "");
                    }

                    this.props.clearBreadcrumb();
                    window.react.history.push(url);

                }

                case "HIDE_PAGE": {

                }

                case "SHOW_PAGE": {

                    //iscroll not initialised for some reason on 8.4 devices
                    if (typeof window.react.menu == 'undefined') {
                        var menuArray = $('div[react-module=CSR]>[data-role=panel]');

                        window.react.menu = 1;

                        //I have no idea why.
                        if (devDetection.isIOS8()) {
                            new window.iScroll($(menuArray[0]).attr("id"), {hScroll: false});
                            new window.iScroll($(menuArray[1]).attr("id"), {hScroll: false});
                        }

                    }

                    break;
                }
            }
        }.bind(this));
    }

    render() {
        const { store, history } = this.props

        const routerUpdate = () => {

        }

        const routerEnter = (/*nextState*/) => {

        }

        const loadData = ( ) => {

        }

        if (!this.props.showPage) {
            return null;
        }

        return (
            <Provider store={store}>
                <Router onUpdate={routerUpdate} history={history}>
                    <Route name="TEst" path="/" component={App}>
                        <IndexRoute component={SearchPage} onEnter={loadData} />
                        <Route name="Systems" path="systems/:categoryId" component={SystemSelectionPage}/>
                        <Route name="Systems1" path="systems/" component={SystemSelectionPage}/>
                        <Route name="Systems2" path="system/:systemId" onEnter={routerEnter} component={SystemPage}/>
                        <Route name="Systems3" path="content/:contentId" component={ContentPage}/>
                        <Route name="Search" path="search" component={SearchPage} />
                        <Route name="SearchResult" path="searchResult" component={SearchResultPage} />
                        <Route name="SearchSystemResult" path="searchSystemResult" component={SearchSystemResultPage} />
                        <Route name="favourites" path="favourites/" component={FavouritesPage}/>
                        <Route name="favouritesJump" path="favourites/:showPage" component={FavouritesPage}/>
                    </Route>
                </Router>
            </Provider>
        )
    }
}
//<DevTools />

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
      return {
        clientHeight: state.windowSize.screenHeight,
        clientWidth: state.windowSize.screenWidth,
        setHidePage: PropTypes.func.isRequired,
        setShowPage: PropTypes.func.isRequired,
        getUser: PropTypes.func.isRequired,
        getCategory: PropTypes.func.isRequired,
        sendFile: PropTypes.func.isRequired,
        showPage: state.config.showPage,
        clearBreadcrumb: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, {setHidePage, setShowPage, clearBreadcrumb, getUser, sendFile, getCategory}) (Root)
