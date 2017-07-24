import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

//Required For LC
window.React = React;

import { render } from 'react-dom'

import { createMemoryHistory } from 'react-router'

import Root from './app/Root'
import configureStore from './app/store/configureStore'
import { AppContainer } from 'react-hot-loader';

import './styles/App.less';
import './assets/bootstrap.css';


import config from 'config';

var tinymce = require('./assets/tinymce.min.js');
window.react.loadPage = 0;

document.getElementById("REACT-CSR").addEventListener("CUSTOMERAPP_ACTION", function(event) {

        switch (event.detail.action) {

            case "CHANGE_PAGE":
            {
                // This is old code - probably not necessary.
                var url = event.detail.data.url.replace(config.UI_ROOT, "").replace("#", "");
                if (!url.includes("content/")) {
                    if (!url.includes("system/")) {
                        localStorage.setItem('REACT-CSR-openOn', url);
                        //console.error(url);

                    }
                }
            }
        }
    }

);

function loadJQuery(){
    // Literally canvas is literally a pain in the ass

    var waitForLoad = function () {


        // We must wait until the user logs in with a token because React loads up quicker than jquery mobile
        if ((typeof jQuery != "undefined")) {

            if (window.react.menuLoad != 1) {
                window.react.menuLoad = 1;

                var menuArray     = $('div[react-module=CSR]>[data-role=panel]');
                var $menuObj      = $("#" + $(menuArray[0]).attr("id"));
                var $menuObjShare = $("#" + $(menuArray[1]).attr("id"));

                var $items = $('div[data-role=panel]');



                $items.each(function (e) {
                    //console.error($($items[e]));
                    var $menu = $($items[e]);

                    $menu.on("panelopen", function (event, ui) {

                        var $menuTar = $(event.currentTarget);
                        $menuTar.css("cssText", "height: " + $(window).outerHeight() + "px; min-height: initial !important; max-height: initial !important");


                        // Ios this isnt necessarily defined for some strange reason for the share menu.
                        if (typeof $menuTar.data("mobileIscrollview") != "undefined") {


                            $menuTar.data("mobileIscrollview").iscroll.refresh()
                            if (typeof  $("div[react-module=CSR] div[data-role=content]").data("mobileIscrollview") != "undefined") {
                                if (typeof  $("div[react-module=CSR] div[data-role=content]").data("mobileIscrollview").iscroll != "undefined") {
                                    $("div[react-module=CSR] div[data-role=content]").data("mobileIscrollview").iscroll.refresh()
                                }
                            }
                        }

                    });
                });

            }

            if (typeof window.$currentPage != "undefined") {
                if (window.$currentPage.indexOf("porthole") == 0) {
                    window.react.loadPage = 1;
                }
            }

            if (window.react.loadPage == 0) {
                if (window.react.loadPage == 2) {
                    jQuery(document).on("pageshow", function (event) {
                        window.react.loadPage = 1;

                        $("#porthole_3Menu").height(window.screen.availHeight);
                    });
                    window.react.loadPage = 2;
                }
            }

            if (window.react.loadPage != 1) {
                window.setTimeout(waitForLoad, 500);
                return;
            }
            if (window.config.auth.getToken() != null) {
                //var jqueryAdapter = require ('./assets/ckeditor/adapters/jquery.js');

                function throttledresizeHandler( event ) {
                    $("#porthole_3Menu").height(window.screen.availHeight);

                }
                $( window ).on( "throttledresize", throttledresizeHandler );



                /*
                    Some random problem i believe with iscrol and ios
               */

                $('div[react-module="CSR"] a[data-ga-event-action="ShareContact"], div[react-module="CSR"] a[data-ga-event-action="Click"]').on("click tap", function (event) {

                        event.stopImmediatePropagation();
                        event.preventDefault();
                        event.stopPropagation();
                        window.open(event.target.href, '_blank');

                        var a = document.createElement('a');

                        a.setAttribute('href', event.target.href);
                        a.setAttribute('target', '_blank');
                        a.setAttribute('rel', 'external');

                        var dispatch = document.createEvent('HTMLEvents');

                        dispatch.initEvent('click', true, true);
                        a.dispatchEvent(dispatch);

                    }
                );
                $('div[react-module="CSR"] .shareButtons a').on("tap", function (event) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    event.stopPropagation();

                    window.open(event.currentTarget.href, '_blank');

                    var a = document.createElement('a');

                    a.setAttribute('href', event.currentTarget.href);
                    a.setAttribute('target', '_blank');
                    a.setAttribute('rel', 'external');

                    var dispatch = document.createEvent('HTMLEvents');

                    dispatch.initEvent('click', true, true);
                    a.dispatchEvent(dispatch);

                })


                $("input[name=your-name]").on("tap click", function () {
                    $("input[name=your-name]").focus()
                });
                $("input[name=tel]").on("tap click", function () {
                    $("input[name=tel]").focus()
                });


                // invoke any methods defined in your JS files to begin execution
                // Get the state tree
                const history = createMemoryHistory()

                const store = configureStore({}, history);

                window.react = Object.assign(window.react, {history: history})
                //window.tinyMCE = tinyMCE;

                window.react.loadPage = 3;

                render(
                < AppContainer >
                < Root
                store = {store}
                history = {history} / >
                    < / AppContainer >,
                    document.getElementById('REACT-CSR')
                )

                // Hot Module Replacement API
                if (module.hot) {
                    module.hot.accept('./app/Root', () => {
                        const NextApp = require('./app/Root').default;
                    ReactDOM.render(
                    < AppContainer >
                    < NextApp
                    store = {store}
                    history = {history} / >
                        < / AppContainer >,
                        document.getElementById('REACT-CSR'));
                    });
                }
            }
        } else {
            window.setTimeout(waitForLoad, 500);
        }
    };
    window.setTimeout(waitForLoad, 500);
}

window.onload = loadJQuery;







