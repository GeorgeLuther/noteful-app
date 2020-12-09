import React from 'react';
import { Link } from 'react-router-dom';

export default class FolderSidebar extends React.Component {
    render() {
        const getFolders = () => {
            return this.props.folders.map(folder => {
                return this.props.match.params.folderId === folder.id
                    ? <Link to={`/folder/${folder.id}`}><li className='activeFolder'>{folder.name}</li></Link>
                    : <Link to={`/folder/${folder.id}`}><li>{folder.name}</li></Link>
            })
        }
        
        return (
            <ul>
                {getFolders()}
                <li>Add Folder</li>
            </ul>
        )
    }
}