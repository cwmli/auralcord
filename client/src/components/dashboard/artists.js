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
        <div className="mw6 bg-white pa4 ma3 ba br4 b--black-10">
          <h1 className="ph3">Top Artists</h1>
          <hr className="mh3 black-40"/>
          <ul className="pa0">
            {this.props.topArtists.data.artists.map((artist, i) => {
              return (
                <li key={i} className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
                  <img className="w2 h2 w3-ns h3-ns br-100" src={artist.image.url} />
                  <div className="pl3 flex-auto">
                    <span className="f3 db black">{artist.name}</span>
                    <span className="f6 db white">{
                      artist.genres.map((genre, i) => {
                        return (
                          <div key={i} className={"br-pill ph2 ma1 dib"} style={toMaterialStyle(genre)}>
                            {genre}
                          </div>
                        )
                      })}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>ARTISTS STAT CARD</div>
      )
    }
  }
}

const Artists = connect(mapStateToProps, mapDispatchToProps)(ConnectedArtists);
export default Artists;
