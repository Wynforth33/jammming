// Imports
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'; // <SearchBar />
import SearchResults from '../SearchResults/SearchResults'; // <SearchResults />
import PlayList from '../PlayList/PlayList'; // <PlayList />
import Spotify from '../../Util/Spotify'; // Spotify API Object

// Create <App /> ['React'(Component)]; Builds Application Front-end
class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      searchResults: []
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.saveSpotify = this.saveSpotify.bind(this);
  }

  // Handles The 'GET' interaction with the Spotify API;
  // specifically getting search results based on a given Term.
  searchSpotify(term){
    const fakeTrax = [
      {
        id: 1,
        title: 'Tiny Monsters',
        artist: 'Puscifer',
        album: 'Conditions of My Parole'
      },
      {
        id: 2,
        title: 'Green Valley',
        artist: 'Puscifer',
        album: 'Conditions of My Parole'
      },
      {
        id: 3,
        title: 'Monsoons',
        artist: 'Puscifer',
        album: 'Conditions of My Parole'
      }
    ];
    // Spotify.search(term).then(response => {
    //   this.setState({searchResults: response});
    // });
    this.setState({searchResults: fakeTrax});
  }

  // Handles the 'POST' interaction with the Spotify API;
  // specifically posting a playlist and a name to Spotify Account.
  saveSpotify(playList, playListName){
    Spotify.save(playList, playListName);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <PlayList saveSpotify={this.saveSpotify} />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default App; // <App />
