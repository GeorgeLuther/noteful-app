import React from 'react'
import { Redirect } from 'react-router-dom'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { BASE_URL } from '../GlobalFuncs'

import APIContext from '../APIContext'

export default class Note extends React.Component {
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
      e.preventDefault()
      
      fetch(`${BASE_URL}/notes/${e.target.name}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
        .then(res => {
          
          if (!res.ok) {
            console.log('not ok', res)
            return res.json().then(e => Promise.reject(e))
          }
          console.log('is ok',res)
          // return res.json()
        })
        .then(() => {
          this.context.deleteNote(e.target.name)
          this.props.history.push('/')
        })
        .catch(error => {
          console.error(error)
        })
  }
    updateContent = e => {

    }
    render() {
      console.log('me', this.props.match.params)
        const { notes=[] } = this.context
        console.log(notes)
        const { noteId } = this.props.match.params
        const note=notes.find(note => Number(note.id) === Number(noteId))
        console.log('notey',note)
    
        // const {id, modified, content, folderId } = note

        // const currentNote = findNote(notes,noteId)
        // console.log('currentNote', currentNote)
      // const { name, id, modified, content } = this.props 
      // console.log('props',this.props)

      let date = new Date(note.modified);
      let formatted = format(date, 'do LLL yyyy');
      //const currentNote = findNote(notes, id) || { content: '' }
       if (note) {
        return (
            <section>
                <div className='note'>
                    <h2>{note.name}</h2>
  
                    <p>Date modified: {formatted}</p>
                    <button type="button" name={noteId} onClick={this.handleClickDelete}>Delete Note</button>
                </div>
                <textarea cols='60' rows='20' defaultValue={note.content} onChange={this.updateContent}></textarea>
            </section>
        )
       }
       return (<Redirect to={'/'}/>)
    }
}

Note.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onDeleteNote: PropTypes.func
}