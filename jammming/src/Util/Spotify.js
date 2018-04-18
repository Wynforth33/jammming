const clientID = '47d28e88bd77428d80980a437241ea30';
const redirectURI = 'http://localhost:3000/';
let accessToken
let expiresIn

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
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`;
    }
  },

  search(term){
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&limit=20&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
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
            Authorization: `Bearer ${Spotify.accessToken}`
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
