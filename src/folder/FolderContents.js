import React from 'react'
import { format } from 'date-fns'
import { Link, Redirect } from 'react-router-dom'
import APIContext from '../APIContext'
import { getNotes, BASE_URL } from '../GlobalFuncs'
import PropTypes from 'prop-types'

export default class FolderContents extends React.Component {
    
    //pass the params
    static defaultProps = {
        match: {
            params: {}
        },
        onDeleteNote: () => {}
    }
    //pass the folders and notes
    static contextType = APIContext
    
    handleClickDelete = e => {
      console.log('folder click delete')
      e.preventDefault()
      fetch(`${BASE_URL}/notes/${e.target.name}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          //return res.json()
        })
        .then(() => {
          this.context.deleteNote(e.target.name)
          this.props.history.go(0)
        })
        .catch(error => {
          console.error({ error })
        })
    }

    render() { 
        const { notes=[] } = this.context
        console.log('params',this.props.match.params)
        const { folderId } = this.props.match.params
 
        const displayNotes = () => {
            let notesToShow = notes
            
            if (folderId) {
              notesToShow = notes.filter(note => note.folderId == folderId)
            }

            return notesToShow.map(note => {
              let date = new Date(note.modified);
              let formatted = format(date, 'do LLL yyyy');
                return (
                    <li key={note.id} className='note'>
                        {/* add link to note */}
                        <h2><Link to={`/note/${note.id}`}>{note.name}</Link></h2>
                        <p>Date modified: {formatted}</p>
                        <button type="button" name={note.id} onClick={this.handleClickDelete}>Delete Note</button>
                    </li>
                )
            })
        }
        if (getNotes(notes, folderId) !== ' ') {
        return (
            <ul>
                <li><button type="button" className="add-note-btn" onClick={e => this.props.history.push('/new-note')}>Add Note</button></li>
                {displayNotes()}
            </ul>
        )}
        return (<Redirect to={'/'}/>)
    }
    // render(){
    //   const { folderId } = this.props.match.params
    //   const { notes=[] } = this.context
    //   const notesForFolder = getNotes(notes, folderId)
    //   console.log('note', notesForFolder)
    //   return (
    //     <section>
    //       <ul>
    //         {notesForFolder.map(note =>
    //           <li key={note.id}>
    //             <Note 
    //               id={note.id}
    //               name={note.name}
    //               modified={note.modified}
    //               content={note.content}
    //             />
    //           </li>
    //           )}
    //       </ul>

    //     </section>
    //   )
    // }
} 

FolderContents.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteNote: PropTypes.func,
}