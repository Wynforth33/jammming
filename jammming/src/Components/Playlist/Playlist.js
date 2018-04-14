//  Imports
import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList'; // <TrackList />

// Create <PlayList /> ['React'(Component)]
class PlayList extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  handleSave(e){
    this.props.saveSpotify(this.state.playList, this.state.playListName);
    e.preventDefault();
  }

  render() {
    return (
      <div className="Playlist">
        <input
          onChange={this.handleNameChange}
          defaultValue='New Playlist' />



        <TrackList
          onRemove={this.props.onRemove}
          isRemoval={true}
          tracks={this.props.playListTracks} />


        <a onClick={this.handleSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

// Exports
export default PlayList; // <PlayList />
