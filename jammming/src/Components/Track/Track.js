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

  /* Checks if Track has a sample preview, by checking if the value saved to this.props.track.preview_url is equal to null or not. */
  renderSampleAction(){
    if (this.props.track.sample) {
      return <a href={this.props.track.sample} target="_blank"><i className="fa fa-play-circle"></i></a>;
    } else {
      return <i className="fa fa-ban sample"></i>
    }
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
        {this.renderSampleAction()}
        {this.renderAction()}
      </div>
    )
  }
}

export default Track; // <Track />
