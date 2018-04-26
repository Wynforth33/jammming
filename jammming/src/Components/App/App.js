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
    const trackList = this.state.playlistTracks.map(track => track.uri);
    const listName = this.state.playlistName;
<<<<<<< HEAD
    Spotify.savePlayList(listName, trackList);
    this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
    })
=======
    Spotify.savePlaylist(listName, trackList).then(()=>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
>>>>>>> 32c66d24549eacf3c0cf2d427e05ecf7fcf14fd2
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
