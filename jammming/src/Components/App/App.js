// Imports
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../Util/Spotify';

// Spotify.getAccessToken();

// Create <App /> ['React'(Component)]; Builds Application Front-end
class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      searchResults: [{
        id: 1,
        title: 'Tiny Monsters',
        artist: 'Puscifer',
        album: 'Conditions of My Parole',
        uri: 'a'
      },
      {
        id: 2,
        title: 'Tiny Monsters',
        artist: 'Puscifer',
        album: 'Conditions of My Parole',
        uri: 'b'
      }],
      playlistName: '',
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
    const listURIs = this.state.playlistTracks.map(track => track.uri);
    const listName = this.state.playlistName;
    Spotify.savePlaylist(listName, listURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    })
  }

  search(term){
    const results = Spotify.search(term);
    this.setState({searchResults: results});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default App; // <App />
