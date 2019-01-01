import React, { Component } from 'react';
import { connect } from 'react-redux';
import toMaterialStyle from 'material-color-hash';
import { fetchSpotifyTopArtists } from '../../App/actions';

function mapStateToProps(state) {
  return {
    topArtists: state.spotify_top_artists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserTopArtists: () => dispatch(fetchSpotifyTopArtists())
  };
}

class ConnectedArtists extends Component {
  
  componentDidMount() {
    this.props.getUserTopArtists();
  }

  render() {
    if (this.props.topArtists && !this.props.topArtists.isFetching) {
      return (
        <div className="bg-white">
          <h2 className="mv0">Your Top Artists</h2>
          <hr className="bb bw1 b--black-10 mb3"/>
          <div className="flex flex-wrap">
            {this.props.topArtists.data.artists.map((artist, i) => {
              return (
                <div className="w-20">
                  <a key={i} href={artist.external_urls.spotify} className="db link aspect-ratio aspect-ratio--1x1 tc dim" style={{backgroundImage: `url(${artist.image.url})`}}>
                    <span role="img" aria-label={artist.name} style={{backgroundImage: `url(${artist.image.url})`}} class="bg-center cover aspect-ratio--object">
                    </span>
                    <span className="z-999 absolute bottom-1 left-0 pa1 ttu tracked white bg-black">{artist.name}</span>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div className="bg-white">
          <h2 className="mv0">Your Top Artists</h2>
          <hr className="bb bw1 b--black-10"/>
          <div className="flex flex-wrap">
            LOADING
          </div>
        </div>
      )
    }
  }
}

const Artists = connect(mapStateToProps, mapDispatchToProps)(ConnectedArtists);
export default Artists;
