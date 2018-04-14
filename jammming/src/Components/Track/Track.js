// Imports
import React from 'react';
import './Track.css';

// Create <Track /> ['React'(Component)]
class Track extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.addToPlayList = this.addToPlayList.bind(this);
  // }
  // addToPlayList(e){
  //   const chosenTrack = e.props.track;
  // }
  render() {
    const trackProps = this.props.track; // capture ['track'(Props-Object)]
    // trackAction(){
    //   if () //will come back to this.
    // } //we will revisit trackaction
    return (
      <div class="Track">
        <div class="Track-information">
          <h3>{trackProps.title}</h3>
          <p>{trackProps.artist} | {trackProps.album}</p>
        </div>
        <a class="Track-action">+</a>
      </div>
    )
  }
}

export default Track; // <Track />
