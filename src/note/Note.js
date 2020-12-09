import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
export default class Note extends React.Component {
    render() {
        const currentNote = this.props.notes.find(note => note.id === this.props.match.params.noteId)
        return (
            <section>
                <div className='note'>
                    <h2><Link to={`/note/${currentNote.id}`}>{currentNote.name}</Link></h2>
                    <p>Date modified: {format(new Date(currentNote.modified), 'MM/dd/yyyy')}</p>
                    <button type="button">Delete Note</button>
                </div>
                <p>{currentNote.content}</p>
            </section>
        )
    }
}