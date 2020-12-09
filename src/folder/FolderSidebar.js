import React from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext'

export default class FolderSidebar extends React.Component {
    //pass the params
    static defaultProps = {
        match: {
            params: {}
        }
    }
    //pass the folders and notes
    static contextType = APIContext
    render() {
        const { folders=[] } = this.context
        const { folderId } = this.props.match.params
        console.log(folders)
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
                <li>Add Folder</li>
            </ul>
        )
    }
}