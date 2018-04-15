// Spotify Variables
const clientID = '47d28e88bd77428d80980a437241ea30';
const redirectUri = 'http://localhost:3000/';
let accessToken = '';
let expiresIn = '';

// GET Authorization Properties
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

// GET Search Results Properties
const type = 'track';
const limit = '10';
const searchURL = `https://api.spotify.com/v1/search&type=${type}&limit=${limit}?p=`;
/* Documentation(Search)

Example: https://api.spotify.com/v1/search?q=Muse
             &type=artists
             &market=US
             &limit=20

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
"artists": {
  "href": "https://api.spotify.com/v1/search?query=Muse&type=artist&market=US&offset=0&limit=1",
  "items": [
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
      },
      "followers": {
        "href": null,
        "total": 3601221
      },
      "genres": [
        "modern rock",
        "permanent wave",
        "piano rock",
        "post-grunge",
        "rock"
      ],
      "href": "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
      "id": "12Chz98pHFMPJEknJQMWvI",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/19ac88c7aec1f68aa6e207aff29efa15d37336a7",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/7ad2128db73a2814a1a96498404a5d9aabb4c15c",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/f026a6204c28907e43e833eaa1820f9b674295ca",
          "width": 160
        }
      ],
      "name": "Muse",
      "popularity": 78,
      "type": "artist",
      "uri": "spotify:artist:12Chz98pHFMPJEknJQMWvI"
    }
  ],
  "limit": 1,
  "next": "https://api.spotify.com/v1/search?query=Muse&type=artist&market=US&offset=1&limit=1",
  "offset": 0,
  "previous": null,
  "total": 186
}
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
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artist[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      } else {
        return [];
      }
    });
  },

  save(list, name){
  }
}

export default Spotify;
