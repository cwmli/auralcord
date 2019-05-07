import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import { fetchSpotifyQueriedPlaylist, fetchSpotifyTrackFeatures } from '../../App/actions';

import { movingAverage } from '../utils/math';
import FeatureChart from './featurecharts';

function mapStateToProps(state) {
  return {
    queriedPlaylist: state.spotify_queried_playlist,
    playlistTrackFeatures: state.spotify_track_features
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaylist: (id) => dispatch(fetchSpotifyQueriedPlaylist(id)),
    getTrackFeatures: (requestId, ids) => dispatch(fetchSpotifyTrackFeatures(requestId, {ids: ids}))
  };
}
class ConnectedPlaylist extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    this.props.getPlaylist(this.props.match.params.id).then(() => {
      const queriedPlaylistTracks = this.props.queriedPlaylist.data.tracks;
      
      let id = md5(this.props.match.params.id + queriedPlaylistTracks.offset);
      let queriedPlaylistTrackIds = queriedPlaylistTracks.items.map((trackObj) => {
        return trackObj.track.id
      })

      this.props.getTrackFeatures(id, queriedPlaylistTrackIds).then(() => {
        this.setState({ isLoaded: true });
      });
    });
  }
  
  render() {
    if (this.state.isLoaded) {
      let playlist = this.props.queriedPlaylist.data;
      let trackFeatures = this.props.playlistTrackFeatures.data;
      let labelMapping = trackFeatures.id.reduce(
        (mapping, id, i) => { mapping[id] = playlist.tracks.items[i].track.name; return mapping; }, {});
      let featureCharts = [];

      for (var category in trackFeatures) {
        if (!['danceability', 'energy', 'tempo', ].includes(category)) { continue; }
        let trackCategory = trackFeatures[category].map((tempo, i) => { return [trackFeatures.id[i], tempo] });
        let trackCategoryRA = (movingAverage(trackFeatures[category], 10)).map((ma, i) => { return [trackFeatures.id[i], ma]});
        
        featureCharts.push(
          <FeatureChart 
            title={category.toUpperCase()}
            xDomain={trackFeatures.id}
            chartData={trackCategory}
            lineData={trackCategoryRA}
            labelMapping={labelMapping}
          />
        );
      }

      return (
        <div className="ph4 pt4 vh-85 flex items-start">
          <div className="w-30-ns w-40-m flex flex-column pr3 br b--black-10 h-100">
            <div className="db pb1">
              <img className="dib w3 h3 pr3" src={playlist.images[0].url} alt='playlist-image' />
              <dl className="mt2 dib mb1 lh-copy">
                <dd className="ml0 f4 black b truncate w-100">{playlist.name}</dd>
                <dd className="ml0 f6 gray truncate w-100">{playlist.followers.total} Followers - {playlist.tracks.total} Tracks</dd>
                <dd className="ml0 f6 gray truncate w-100">by {playlist.owner.display_name}</dd>
              </dl>
            </div>
            <div className="f6 gray bb b--black-10 bw1 pb3" dangerouslySetInnerHTML={{__html: playlist.description}} />
            <div className="overflow-auto">
            {playlist.tracks.items.map((trackObj, i) => {
              return (
                <a key={i} 
                   href={trackObj.track.external_urls.spotify} id={trackObj.track.id} 
                   className="flex dim items-center link lh-copy pa1 bb b--black-10">
                  <img className="w2 h2 br3" src={trackObj.track.album.images[0].url} alt={trackObj.track.album.name + '-avatar'} />
                  <div className="pl3 flex-auto">
                    <span className="f6 b db black">{trackObj.track.name}</span>
                    <span className="f6 db black">{trackObj.track.artists[0].name} - {trackObj.track.album.name}</span>
                  </div>
                </a>
              )
            })}
            </div>
          </div>
          <div className="w-70-ns w-60-m flex flex-column h-100 overflow-auto">
            {featureCharts}
          </div>
        </div>
      )
    } else {
      return (
        <div>LOADING</div>
      )
    }
  }
}

const Playlist = connect(mapStateToProps, mapDispatchToProps)(ConnectedPlaylist);
export default Playlist;
