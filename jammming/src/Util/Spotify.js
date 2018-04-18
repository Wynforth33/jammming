let accessToken = '';
const clientID = '47d28e88bd77428d80980a437241ea30';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken(){
    let expiresIn = '';
    let currentURL = window.location.href;
    const URLAccessToken = currentURL.match(/access_token=([^&]*)/);
    const tokenExpires_in = currentURL.match(/expires_in=([^&]*)/);
    const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`;
    if (accessToken){
      return accessToken;
    } else if (URLAccessToken && tokenExpires_in){
      accessToken = URLAccessToken[0];
      expiresIn = tokenExpires_in[0];
      window.setTimeout(()=> accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      currentURL = `${authorizeURL}`;
    }
    console.log(accessToken);
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
    Spotify.getAccessToken();
    let user_id = '';
    let playlist_id = '';
    const profileURL = "https://api.spotify.com/v1/me";
    const createListURL = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    const addTracksURL = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`;
    if (name && list) {
      return fetch(profileURL, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        return user_id = jsonResponse.id;
      }).then(()=> {
        return fetch(createListURL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
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
            Authorization: `Bearer ${accessToken}`,
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
