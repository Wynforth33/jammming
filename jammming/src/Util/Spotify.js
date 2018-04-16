// Spotify Variables
const clientID = '47d28e88bd77428d80980a437241ea30';
const redirectUri = 'http://localhost:3000/';
const headers = { Authorization: `Bearer ${accessToken}` };
let accessToken = '';
let expiresIn = '';

// GET Authorization Variable
const authorizeURL = `https://accounts.spotify.com/authorize&redirect_uri=${redirectUri}&response_type=token?client_id=${clientID}`;
/* Documentation(Authorize - Implicit Grant Flow)

Example: https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164
             &redirect_uri=http:%2F%2Fexample.com%2Fcallback
             &scope=user-read-private%20user-read-email
             &response_type=token
             &state=123

  client_id: "?client_id=${client id goes here}"
    Required - Provided by Spotify during application registration

  response_type: "&response_type=token"
    Required - Set To Token

  redirect_uri: "&redirect_uri=${URI goes here}"
    Required - URI to redirect to ater user grants/denies permission;
    must be entered in the URI whitlist specified during application registration

  State: "&state=${state goes here}"
    Optional: See Documentation (https://developer.spotify.com/web-api/authorization-guide/#implicit_grant_flow);

  Scope: "&scope=user-read-private%20user-read-email"
    Optional: See Documentation (https://developer.spotify.com/web-api/authorization-guide/#implicit_grant_flow);

  Show_Dialog: "&show_dialog=${Boolean}"
    Optional: See Documentation (https://developer.spotify.com/web-api/authorization-guide/#implicit_grant_flow);

RESPONE:
  After USER 'Grants'/'Denies' access,
  USER is re-directed to the ['redirect_uri'(URI)]
  final URL will contain a Hash Fragment with Following DATA:

Example: https://example.com/callback
            #access_token=NwAExz...BV3O2Tk
            &token_type=Bearer
            &expires_in=3600
            &state=123

  access_token: "#access_token=${Access token here}"
    In this example: "NwAExz...BV3O2Tk"
    can be provided in subsequent calls

  token_type: "&token_type=Bearer"
    value: "Bearer"

  expires_in: "&expires_in=${time}"
    value: time period in seconds that access token is valid.

  State: "&state=${state supplied in request}"
    value: of state param supplied in request

If User Denies Access:

Example: https://example.com/callback
            ?error=access_denied
            &state=123

  Error: "?error=${Reason Why Failed}"
    reason authorization failed.
*/
// Regrex to help identify if Token is available or expired
// /access_token=([^&]*)/
// /expires_in=([^&]*)/

// GET Search Results Variable
const type = 'track';
const limit = '10';
const searchURL = `https://api.spotify.com/v1/search&type=${type}&limit=${limit}?p=`;
/* Documentation(Search)

Example: https://api.spotify.com/v1/search?q=Muse
             &type=artists
             &market=US
             &limit=20

  Must Supply "Authorization: Bearer {your access token}"

  Term: "?q=${Query Term Goes Here}"
  Type: "&type=${Type Goes Here}"
    Valid Types:
      -album
      -artists
      -playlist
      -track

  Market: "&market=${market goes here, i.e US}"
    See Documentation (https://beta.developer.spotify.com/documentation/web-api/reference/search/search/)

  Limit: "&limit=${limit goes here}"
    default 20 / Min 1 : Max 50

  Offset: "&offset=${# to offset from 0}"
    default 0 / maximum 100,000

  **Encode spaces with %20 or +

  $.ajax({
    url: 'https://api.spotify.com/v1/me',
    headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    success: function(response) {
        ...
    }
  });

Example Response Body for a Search GET. (Search q=Muse type=Artist limit=1)

{
  "tracks": {
    "href": "https://api.spotify.com/v1/search?query=muse&type=track&market=US&offset=0&limit=1",
    "items": [
      {  <--- Beginning of First Track Object.
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
              },
              "href": "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
              "id": "12Chz98pHFMPJEknJQMWvI",
              "name": "Muse",
              "type": "artist",
              "uri": "spotify:artist:12Chz98pHFMPJEknJQMWvI"
            }
          ],
          "available_markets": [...],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/1BiugL7r9tzsQj2iBezCfW"
          },
          "href": "https://api.spotify.com/v1/albums/1BiugL7r9tzsQj2iBezCfW",
          "id": "1BiugL7r9tzsQj2iBezCfW",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/a14e216a2b2ed877717f371025fa6ddfc2a70883",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/067032e6d156d7d62cc5fbc9bdb5a08269e4979d",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/e3b3bbd404104ce9c5b4f19d9a29269f58004cbf",
              "width": 64
            }
          ],
          "name": "Thought Contagion",
          "release_date": "2018-02-15",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:1BiugL7r9tzsQj2iBezCfW"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
            },
            "href": "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
            "id": "12Chz98pHFMPJEknJQMWvI",
            "name": "Muse",
            "type": "artist",
            "uri": "spotify:artist:12Chz98pHFMPJEknJQMWvI"
          }
        ],
        "available_markets": [...],
        "disc_number": 1,
        "duration_ms": 206098,
        "explicit": false,
        "external_ids": {
          "isrc": "GBAHT1800045"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/35zrlBOjpfDPMcZzglWOuV"
        },
        "href": "https://api.spotify.com/v1/tracks/35zrlBOjpfDPMcZzglWOuV",
        "id": "35zrlBOjpfDPMcZzglWOuV",
        "name": "Thought Contagion",
        "popularity": 75,
        "preview_url": "https://p.scdn.co/mp3-preview/42cd14f044ee5b90bc2286106f4a36f7192855a6?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:35zrlBOjpfDPMcZzglWOuV"
      } <---- End of First Track Object.
    ],
    "limit": 1,
    "next": "https://api.spotify.com/v1/search?query=muse&type=track&market=US&offset=1&limit=1",
    "offset": 0,
    "previous": null,
    "total": 11331
  }
}
*/

// GET User's Profile Variables
let user_id = '';
const profileURL = "https://api.spotify.com/v1/me";
/* Documentation(User's Profile)
Example: "https://api.spotify.com/v1/me"
  Must Supply "Authorization: Bearer {your access token}"

Example Body response
{
  "birthdate": "1937-06-01",
  "country": "SE",
  "display_name": "JM Wizzler",
  "email": "email@example.com",
  "external_urls": {
    "spotify": "https://open.spotify.com/user/wizzler"
  },
  "followers" : {
    "href" : null,
    "total" : 3829
  },
  "href": "https://api.spotify.com/v1/users/wizzler",
  "id": "wizzler",
  "images": [
    {
      "height": null,
      "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg",
      "width": null
    }
  ],
  "product": "premium",
  "type": "user",
  "uri": "spotify:user:wizzler"
}
*/

// POST Playlist (2 Steps)
  // POST Create Playlist on User's accounts
let URIs = [];
let playlist_id = '';
const createListURL =
  // POST Add tracks to Playlist on User's accounts
const addTracksURL = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`;
/* Documentation(Create Playlist)
*/

// Spotify API Object
const Spotify = {
  getAccessToken(){
    const url = window.location.href;
    const urlAccessToken = url.match(/access_token=([^&]*)/);
    const urlExpires_in = url.match(/expires_in=([^&]*)/);
    if (accessToken){
      return accessToken;
    } else if (urlAccessToken && urlExpires_in){
      accessToken = urlAccessToken[0];
      expiresIn = urlExpires_in[0];
      window.setTimeout(()=> accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location.href = `${authorizeURL}`
    }
  },

  search(term){
    return fetch(`${searchURL}${term}`, {
      headers: headers
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
    if (name && list) {
      return fetch(profileURL, {
        headers: headers
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userID = jsonResponse.id;
      }).then












    } else {
      return;
    }
  }
}

export default Spotify;
