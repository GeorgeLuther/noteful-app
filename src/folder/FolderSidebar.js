import React from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext'

export default class FolderSidebar extends React.Component {
    //pass the params
    static defaultProps = {
        match: {
            params: {}
        },
        history: {
            push: {}
        }
    }
    //pass the folders and notes
    static contextType = APIContext
    render() {
        const { folders=[] } = this.context
        const { folderId } = this.props.match.params
        const showFolders = () => {
            return folders.map(folder => {
                return folderId === folder.id
                    ? <Link key={folder.id} to={`/folder/${folder.id}`}><li className='activeFolder'>{folder.name}</li></Link>
                    : <Link key={folder.id} to={`/folder/${folder.id}`}><li>{folder.name}</li></Link>
            })
        }
        return (
            <ul>
                {showFolders()}
                <li><button type="button" className="add-folder-btn" onClick={e => this.props.history.push('/new-folder')}>Add Folder</button></li>
            </ul>
        )
    }
}