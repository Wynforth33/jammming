// Imports
import React from 'react';
import './Track.css';

// Create <Track /> ['React'(Component)]
class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  // If ['+'(action-element)] is clicked it 'ADDS' '<This.Track />' to '<Playlist />'
  addTrack(){
    this.props.onAdd(this.props.track);
  }

  // If ['-'(action-element)] is clicked it 'REMOVES' '<This.Track />' from '<Playlist />'
  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  /*Checks truthiness of 'IsRemoval'; if True, renders ['-'(action)];
  else, render ['+'(action)]*/
  renderAction(){
    if (this.props.isRemoval) {
      return (
        <a
        onClick={this.removeTrack}
        className="Track-action">-</a>
      )
    } else {
      return (
        <a
        onClick={this.addTrack}
        className="Track-action">+</a>
      )
    }
  }

  render() {
    const trackProps = this.props.track; // capture ['track'(Props-Object)]
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{trackProps.title}</h3>
          <p>{trackProps.artist} | {trackProps.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}

export default Track; // <Track />
