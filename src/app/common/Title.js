import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { decodeEntities } from '../common/Functions';

export class Title extends Component {
    render() {
        return (
            <div className="csr-full-width bg-black">
                <div className="csr-title-wrap">
                    <h1 className="csr-title" dangerouslySetInnerHTML={{__html: decodeEntities(this.props.title)}}></h1>
                </div>
            </div>
        )
    }
}


Title.propTypes = {

}

Title.defaultProps = {
    title: PropTypes.string.isRequired,
}

const mapStateToProps = () => {

    return {

    }
}

export default connect(mapStateToProps, {  }) (Title)