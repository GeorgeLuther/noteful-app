import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import APIContext from './APIContext'

import BASE_URL from './GlobalFuncs'

import './App.css'

import FolderSidebar from './folder/FolderSidebar'
import NoteSidebar from './note/NoteSidebar'

import FolderContents from './folder/FolderContents'
import Note from './note/Note'
import NotFoundMain from './main/NotFoundMain'


class App extends React.Component {
  state = {
    folders: [],
    notes: [].notes
  }
  componentDidMount() {

    Promise.all([
      fetch(`${BASE_URL}/notes`),
      fetch(`${BASE_URL}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([notesRes.json(), foldersRes.json()])
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders})
      })
      .catch(error => {
        console.error({error})
      })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  render(){
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    }
    
    return (
      <APIContext.Provider value={ value }>
        <>
        <header>
          <h1><Link className="appTitle" to={'/'}>Noteful</Link></h1>
        </header>
        <main>
          <nav>
            <Switch>
              <Route 
                exact path='/' 
                component={FolderSidebar}
              />
              <Route 
                path='/folder/:folderId' 
                component={FolderSidebar}
              />
              <Route 
                path='/note/:noteId' 
                component={NoteSidebar}
              />
              <Route 
                component={FolderSidebar}
              />
            </Switch>
          </nav>
          <section className="output">
            <Switch>
              <Route 
                exact path='/' 
                component={FolderContents}
              />
              <Route 
                path='/folder/:folderId'
                component={FolderContents}
              />
              <Route 
                path='/note/:noteId' 
                component={Note}
              />
              <Route component={NotFoundMain} />
            </Switch>
          </section>
        </main>
        </>
      </APIContext.Provider>
    );
  }
}

export default App;