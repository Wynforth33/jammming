const Spotify = {
  clientID: '47d28e88bd77428d80980a437241ea30';
  redirectUri: 'http://localhost:3000/';
  accessToken: '';
  expiresIn: '';

  getAccessToken(){
    const url = window.location.href;
    const urlAccessToken = url.match(/access_token=([^&]*)/);
    const urlExpires_in = url.match(/expires_in=([^&]*)/);
    const authorizeURL = `https://accounts.spotify.com/authorize&redirect_uri=${Spotify.redirectUri}&response_type=token?client_id=${Spotify.clientID}`;
    if (Spotify.accessToken){
      return Spotify.accessToken;
    } else if (urlAccessToken && urlExpires_in){
      Spotify.accessToken = urlAccessToken[0];
      Spotify.expiresIn = urlExpires_in[0];
      window.setTimeout(()=> Spotify.accessToken = '', Spotify.expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return Spotify.accessToken;
    } else {
      url = `${authorizeURL}`;
    }
  },

  search(term){
    const searchURL = `https://api.spotify.com/v1/search&type=track&limit=25?p=`;
    return fetch(`${searchURL}${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artist.items[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      } else {
        return [];
      }
    });
  },

  savePlayList(name, list){
    let user_id = '';
    let playlist_id = '';
    const profileURL = "https://api.spotify.com/v1/me";
    const createListURL = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    const addTracksURL = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`;
    if (name && list) {
      return fetch(profileURL, {
        headers: {Authorization: `Bearer ${Spotify.accessToken}`}
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        return user_id = jsonResponse.id;
      }).then(()=> {
        return fetch(createListURL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Spotify.accessToken}`,
            Content-Type: application/json
          },
          body: JSON.stringify({name: name})
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          return playlist_id = jsonResponse.id;
        });
      }).then(()=> {
        return fetch(addTracksURL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Spotify.accessToken}`,
            Accept: application/json
          },
          body: JSON.stringify({uris: list})
        });
      });
    } else {
      return;
    }
  }
}

export default Spotify;
