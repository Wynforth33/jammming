// Imports
import React from 'react';
import Track from '../Track/Track'; // <Track />

// Create <TrackList /> ['React'(Component)]
class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            return (



              <Track
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval}
                key={track.id}
                track={track} />




            )
          })
        }
      </div>
    );
  }
}

// Exports
export default TrackList; // <TrackList />
