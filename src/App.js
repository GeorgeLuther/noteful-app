import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import APIContext from './APIContext'

import { BASE_URL } from './GlobalFuncs'

import './App.css'

import FolderSidebar from './folder/FolderSidebar'
import NoteSidebar from './note/NoteSidebar'

import FolderContents from './folder/FolderContents'
import AddFolder from './folder/AddFolder'

import Note from './note/Note'
import AddNote from './note/AddNote'

import NavError from './NavError'
import NoteError from './NoteError'

import NotFoundMain from './main/NotFoundMain'

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
  }
  componentDidMount() {
    console.log('mounting app!')
    this.getStateUpdate()
    console.log('get state!', this.getStateUpdate())
  }

  handleDeleteNote = noteId => {
    console.log('apps handle delete note ')
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  getStateUpdate = ()=> {    
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
    })}

    // handleAddFolder = folder => {
    //   this.setState({
    //     folder: [...this.state.folders, folder]
    //   });
    // };

    // handleAddNote = note => {
    //   this.setState({
    //     notes: [...this.state.notes, note]
    //   });
    // };

    // renderNavRoutes() {
    //   return(
    //     <>
    //     {['/', '/folder/:folderId'].map(path => {
    //       <Route
    //         exact
    //         key={path}
    //         path={path}
    //         component={FolderSidebar}
    //       />
    //     })}
    //     <Route path='/note/:noteId' component={NoteSidebar}/>
    //     <Route path='/new-folder' component={NoteSidebar}/>
    //     <Route path='/new-note' component={NoteSidebar}/>
    //     </>
    //   )
    // }

    // renderMainRoutes() {
    //   return(
    //     <>
    //     {['/', '/folder/:folderId'].map(path => {
    //       <Route
    //         exact
    //         key={path}
    //         path={path}
    //         component={FolderContents}
    //       />
    //     })}
    //     <Route path='/note/:noteId' component={Note}/>
    //     <Route path='/new-folder' component={AddFolder}/>
    //     <Route path='/new-note' component={AddNote}/>
    //     </>
    //   )
    // }

  render(){
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      getStateUpdate: this.getStateUpdate,
      // addNote: this.handleAddNote,
      // addFolder: this.handleAddFolder,
      deleteNote: this.handleDeleteNote
    }
    return (
      <APIContext.Provider value={value}>
        <>
        <header>
          <h1><Link className="appTitle" to={'/'}>Noteful</Link></h1>
        </header>
        <main>
            <nav>
            <NavError>
              {/* {this.renderNavRoutes()} */}
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
            </NavError>
            </nav>

          <section className="output">
            <NoteError>
            {/* {this.renderMainRoutes()} */}
            <Switch>
              <Route 
                exact path='/' 
                component={FolderContents}
              />
              <Route 
                path='/new-folder'
                component={AddFolder}
              />
              <Route
                path='/new-note'
                component={AddNote}
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
            </NoteError>
          </section>
        </main>
        </>
      </APIContext.Provider>
    );
  }
}

export default App;