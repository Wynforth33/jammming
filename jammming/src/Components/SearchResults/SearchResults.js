// Imports
import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList'; // <TrackList />

// Create <SearchResults /> ['React'(Component)]
class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} />
      </div>
    );
  }
}

// Exports
export default SearchResults; // <SearchResults />
