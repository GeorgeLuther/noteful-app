import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'


export default class FolderContents extends React.Component {

    render() {
        const getNotes = () => {
            if (this.props.match.params.folderId !== undefined) {
                return this.props.notes.filter(note => note.folderId === this.props.match.params.folderId)
            } 
            return this.props.notes
        }

        const displayNotes = () => {
            const notesToShow = getNotes()
            return notesToShow.map(note => {
                return (
                        <li key={note.id} className='note'>
                            {/* add link to note */}
                            <h2><Link to={`/note/${note.id}`}>{note.name}</Link></h2>
                            <p>Date modified: {format(new Date(note.modified), 'MM/dd/yyyy')}</p>
                            <button type="button">Delete Note</button>
                        </li>
                )
            })
        }

        return (
            <ul>
                {displayNotes()}
            </ul>
        )
    }
} 