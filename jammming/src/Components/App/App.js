// Imports
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../Util/Spotify';

// Create <App /> ['React'(Component)]; Builds Application Front-end
class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      searchResults: [{
        id: 1,
        title: 'Tiny Monsters',
        artist: 'Puscifer',
        album: 'Conditions of My Parole'
      },
      {
        id: 2,
        title: 'Tiny Monsters',
        artist: 'Puscifer',
        album: 'Conditions of My Parole'
      }],
      playListName: '',
      playListTracks: []
    };
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
  }

  addTrack(track){
    if (this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      let tracks = this.state.playListTracks;
      tracks.push(track);
      this.setState({playListTracks: tracks});
    }
  }

  removeTrack(track){
    let tracks = this.state.playListTracks;
    const removeTrack = tracks.filter(playListTrack => track.id !== playListTrack.id);
    this.setState({playListTracks: removeTrack});
  }

  updatePlayListName(name){
    this.setState({playListName: name});
  }

  savePlayList(){
    const trackURIs = this.state.playListTracks.map(track => track.id);
    console.log(trackURIs);
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
            <PlayList playListTracks={this.state.playListTracks} onRemove={this.removeTrack} onNameChange={this.updatePlayListName} onSave={this.savePlayList} />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default App; // <App />
