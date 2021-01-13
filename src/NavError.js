import React from 'react'
import PropTypes from 'prop-types'

export default class NavError extends React.Component {
    state = {
        hasError: false
    }
    static getDerivedStateFromError(error) {
        return {hasError:true}
    }
    render() {
        if (this.state.hasError) {
            return <div><p>Could not display navigation</p></div>
        }
        return this.props.children
    }
}

NavError.propTypes = {
    children: PropTypes.element
}