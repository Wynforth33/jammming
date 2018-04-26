// Imports
import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'; // <TrackList />

// Create <PlayList /> ['React'(Component)]
class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
            value={this.props.playlistName}
            onChange={this.handleNameChange}
             />
        <TrackList
            onRemove={this.props.onRemove}
            isRemoval={true}
            tracklist={this.props.playlistTracks} />
        <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

// Exports
export default Playlist; // <PlayList />
