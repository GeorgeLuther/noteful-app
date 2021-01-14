import React from 'react'
import APIContext from '../APIContext'
import { findFolder } from '../GlobalFuncs'
import PropTypes from 'prop-types'

export default class NoteSidebar extends React.Component {
    //pass the params
    static defaultProps = {
        match: {
            params: {}
        }
    }
    //pass the folders and notes
    static contextType = APIContext
    
    render() {
        const { notes=[], folders=[] } = this.context
        const { noteId } = this.props.match.params
        const currentNote=notes.find(note => note.id = noteId)
        console.log('boom',currentNote)
        const currentFolder = !currentNote.folderId ? {name:''} : findFolder(folders, currentNote.folderId)
        
        return (
            <section>
                <h2>{currentFolder.name}</h2>
            </section>
        )
    }
}
NoteSidebar.propTypes = {
    match: PropTypes.object.isRequired,
}
