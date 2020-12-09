import React from 'react'

export default class NoteSidebar extends React.Component {
    render() {
        const currentNote = this.props.notes.find(note => note.id === this.props.match.params.noteId)
        const currentFolder = this.props.folders.find(folder => folder.id === currentNote.folderId)
        return (
            <section>
                <h2>{currentFolder.name}</h2>
            </section>
        )
    }
}