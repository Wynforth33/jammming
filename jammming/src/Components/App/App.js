// Imports
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../Util/Spotify';
import Playlist from '../Playlist/Playlist';

// Create <App /> ['React'(Component)]; Builds Application Front-end
class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    const newTracks = tracks.filter(playlistTrack => track.id !== playlistTrack.id);
    this.setState({playlistTracks: newTracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const listName = this.state.playlistName;
    const trackList = this.state.playlistTracks.map(track => track.uri);
    // Checks if 'this.state.playlistTracks' is empty; if empty, alerts user, ends method.
    if (trackList.length === 0) {
      alert('No Tracks Selected, Add Some Tracks and Try Again!');
      return;
    // If Tracks Present: Checks if 'this.state.playlistName' is default; if default, alerts user, ends method.
    } else if (listName === 'New Playlist') {
      alert('Please Create A Unique Name!');
      return;
    }
    // If neither above are true, executes remainder of method. Significant, as sending a request with zero tracks will return a 400 error; and, as Spotify allows for multiple playlists with the same name, this prevents User from accidentally using the defaul playlist name; effectively requiring the user to put in anything else.
    Spotify.savePlaylist(listName, trackList);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    })
  }

  search(term){
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  render() {
    Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
                searchResults={this.state.searchResults}
                onAdd={this.addTrack} />
            <Playlist
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default App; // <App />
