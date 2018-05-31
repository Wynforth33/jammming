const clientID = '47d28e88bd77428d80980a437241ea30';
const redirectURI = 'http://WynJamm.surge.sh/'; //Surge
let accessToken, expiresIn;

const Spotify = {
  getAccessToken(){
    const url = window.location.href;
    const token = url.match(/access_token=([^&]*)/);
    const time = url.match(/expires_in=([^&]*)/);
    if (accessToken){
      return accessToken;
    } else if (token && time){
      accessToken = token[1];
      expiresIn = time[1];
      window.setTimeout(()=> accessToken = null, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&scope=playlist-modify-public&redirect_uri=${redirectURI}&response_type=token`;
    }
  },

  search(term){
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&limit=20&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
        return response.json();
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      if (!jsonResponse.tracks) {return [];}
      const results = jsonResponse.tracks.items.map(track => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        image: track.album.images[0].url,
        sample: track.preview_url
      }));
      const randomTrack = results[Math.floor(Math.random()*results.length)];
      const randomTrackArt = randomTrack.image;
      document.getElementById('root').style.backgroundImage = `url('${randomTrackArt}')`;
      console.log(results);
      return results;
    });
  },

  savePlaylist(name, list){
    this.getAccessToken();
    let user_id, playlist_id;
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
    // Grabs Current User ID and sets to user_id
    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(response => {
      return response.json();
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      return user_id = jsonResponse.id;
    }).then(()=> {
      // Creates a new playlist on given users account with the name provided and returns a playlist ID to set to playlist_id
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        return playlist_id = jsonResponse.id;
      });
    }).then(()=> {
      // Use user_id and playlist_id to save list of tracks (via a list of uri's) to the given playlist on given users account.
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({uris: list})
      }).then(response => {
      return response.json();
      });
    });
  }
}

export default Spotify;
