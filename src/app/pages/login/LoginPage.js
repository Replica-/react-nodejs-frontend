import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PageComponent }  from 'common/Page';
import LoginForm from './LoginForm'
import { Row, Col, Grid, Button, Nav, NavItem, ButtonToolbar } from 'react-bootstrap';

class LoginPage extends Component {

    constructor (props) {
        super(props);
    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {

    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={6}>
                        <LoginForm/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
    }
}

export default connect(mapStateToProps, {  }) (PageComponent(LoginPage))
