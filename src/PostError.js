import React from 'react'


export default class PostError extends React.Component {
    state = {
        hasError: false
    }
    static getDerivedStateFromError(error) {
        return {hasError:true}
    }
    render() {
        if (this.state.hasError) {
            return <h2>Cannot allow new note or folder.</h2>
        }
        return this.props.children
    }
}
