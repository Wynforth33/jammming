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
        <TrackList
            tracklist={this.props.searchResults}
            onAdd={this.props.onAdd}
            isRemoval={false} />
      </div>
    );
  }
}

// Exports
export default SearchResults; // <SearchResults />
