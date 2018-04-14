// Spotify API Key
const apiKey = '';
const cors = 'https://cors-anywhere.herokuapp.com/';
const url = '';
// const user = '';

// Spotify API Object
const Spotify = {
  // Will handle 'GET'ing the SearchResult based on 'Term'
  search(term){
    return fetch(`${cors}${url}${term}`, {
      headers: {
        Authorization: `${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artist,
          album: track.album
        }));
      }
    });
  },

  //Will handle 'Push'ing A Playlist and Its Name to user Spotify Account.
  save(playList, playListName){
    // we will cross this road when we get there.
  }
}

export default Spotify;
