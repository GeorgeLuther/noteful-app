import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import APIContext from '../APIContext'
import { getNotes } from '../GlobalFuncs'


export default class FolderContents extends React.Component {
    //pass the params
    static defaultProps = {
        match: {
            params: {}
        }
    }
    //pass the folders and notes
    static contextType = APIContext

    render() { 
        const { notes=[] } = this.context
        const { folderId } = this.props.match.params

        const displayNotes = () => {
            const notesToShow = getNotes(notes, folderId)
            console.log(`show ${notesToShow}`)
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