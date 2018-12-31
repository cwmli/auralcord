import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSpotifyTopTracks } from '../../App/actions';

function mapStateToProps(state) {
  return {
    topTracks: state.spotify_top_tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserTopTracks: () => dispatch(fetchSpotifyTopTracks())
  };
}

class ConnectedTracks extends Component {
  
  componentDidMount() {
    this.props.getUserTopTracks();
  }

  render() {
    if (this.props.topTracks && !this.props.topTracks.isFetching) {
      return (
        <div className="bg-white">
          <h2 className="mv0">Your Top Tracks</h2>
          <hr className="bb bw1 b--black-10"/>
          <div className="flex flex-column flex-wrap">
            {this.props.topTracks.data.tracks.map((track, i) => {
              return (
                <a key={i} href={track.external_urls.spotify} className="flex dim items-center link lh-copy pa3 ph0-l bb b--black-10">
                  <div className="f4 w3 tc black">{i + 1}</div>
                  <img className="w2 h2 w3-ns h3-ns br3" src={track.album.images[0].url} alt={track.album.name + '-avatar'} />
                  <div className="pl3 flex-auto">
                    <span className="f3 db black">{track.name}</span>
                    <span className="f6 db black">{track.artists[0].name}</span>
                    <span className="f6 db black">{track.album.name}</span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div>TRACKS STAT CARD</div>
      )
    }
  }
}

const Tracks = connect(mapStateToProps, mapDispatchToProps)(ConnectedTracks);
export default Tracks;
