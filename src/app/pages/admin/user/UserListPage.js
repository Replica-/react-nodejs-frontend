import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from './common/CommonActions'
import { safe } from './common/Functions'
import { Row, Col } from 'react-bootstrap';
import NavBar from 'common/NavBar'
import SideBar from 'common/SideBar'

export class UserListPage extends Component {



}

export default connect(mapStateToProps, { showLoading, hideLoading }) (PageComponent(UserListPage))
