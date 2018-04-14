//  Imports
import React from 'react';
import './PlayList.css';

// Create <PlayList /> ['React'(Component)]
class PlayList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playList: [],
      playListName: ''
    };

    this.handlePlayListNameChange = this.handlePlayListNameChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handlePlayListNameChange(e){
    this.setState({playListName: e.target.value});
  }

  handleSave(e){
    this.props.saveSpotify(this.state.playList, this.state.playListName);
    e.preventDefault();
  }

  render() {
    return (
      <div className="Playlist">
        <input
          onChange={this.handlePlayListNameChange}
          placeholder='New Playlist' />
        <div className="TrackList">
        </div>
        <a onClick={this.handleSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

// Exports
export default PlayList; // <PlayList />
