import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PageComponent }  from 'common/Page';
import { Row, Col, Grid, Button, Nav, NavItem, ButtonToolbar } from 'react-bootstrap';

class SplashPage extends Component {

    constructor (props) {
        super(props);
    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={6} sm={6}><Button bsStyle="success">secondary</Button>{' '}</Col>
                    <Col xs={6} sm={6}><Button bsStyle="primary">primary</Button></Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
    }
}

export default connect(mapStateToProps, {  }) (PageComponent(SplashPage))