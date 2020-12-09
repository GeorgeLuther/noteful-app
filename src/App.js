import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import dummyStore from './dummy-store';

import './App.css'

import FolderSidebar from './folder/FolderSidebar'
import NoteSidebar from './note/NoteSidebar'

import FolderContents from './folder/FolderContents'
import Note from './note/Note'
import NotFoundMain from './main/NotFoundMain'

class App extends React.Component {
  state = {
    folders: dummyStore.folders,
    notes: dummyStore.notes
  }
  
  render(){
    console.log(this.state)
    return (
      <>
        <header>
          <h1><Link className="appTitle" to={'/'}>Noteful</Link></h1>
        </header>
        <main>
          <nav>
            <Switch>
              <Route 
                exact path='/' 
                render={(props)=> <FolderSidebar {...props} folders={this.state.folders}/>}
              />
              <Route 
                path='/folder/:folderId' 
                render={(props)=> <FolderSidebar {...props} folders={this.state.folders} />}
              />
              <Route 
                path='/note/:noteId' 
                render={(props)=> <NoteSidebar {...props} notes={this.state.notes} folders={this.state.folders}/>}
              />
              <Route 
                render={(props)=> <FolderSidebar {...props} folders={this.state.folders}/>} 
              />
            </Switch>
          </nav>
          <section className="output">
            <Switch>
              <Route 
                exact path='/' 
                render={(props)=> <FolderContents {...props} notes={this.state.notes} />}
              />
              <Route 
                path='/folder/:folderId'
                render={(props)=> <FolderContents {...props} notes={this.state.notes} />}
              />
              <Route 
                path='/note/:noteId' 
                render={(props)=> <Note {...props} notes={this.state.notes} />}
                />
              <Route component={NotFoundMain} />
            </Switch>
          </section>
        </main>
      </>
    );
  }
}

export default App;