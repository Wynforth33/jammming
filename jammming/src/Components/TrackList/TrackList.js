// Imports
import React from 'react';
import Track from '../Track/Track'; // <Track />

// Create <TrackList /> ['React'(Component)]
class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracklist.map(track => {
            return <Track key={track.id} track={track} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />
          })
        }
      </div>
    );
  }
}

// Exports
export default TrackList; // <TrackList />
