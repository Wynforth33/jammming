// Imports
import React from 'react';
import './Track.css';

// Create <Track /> ['React'(Component)]
class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(){
    this.props.onAdd(this.props.track)
  }
  
  render() {
    const trackProps = this.props.track; // capture ['track'(Props-Object)]
    // trackAction(){
    //   if () //will come back to this.
    // } //we will revisit trackaction
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{trackProps.title}</h3>
          <p>{trackProps.artist} | {trackProps.album}</p>
        </div>
        <a
          onClick={this.addTrack}
          className="Track-action">+</a>
      </div>
    )
  }
}

export default Track; // <Track />
