import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import { fetchSpotifyQueriedPlaylist, fetchSpotifyTrackFeatures } from '../../App/actions';

import * as d3 from 'd3';
import D3Chart from '../charts/chart';
import Bars from '../charts/bars';
import Lines from '../charts/lines';
import Axis from '../charts/axis';
import horizontalLine from './decorators/hline';

import { movingAverage } from '../utils/math';

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

  componentDidMount() {
    this.props.getPlaylist(this.props.match.params.id).then(() => {
      const queriedPlaylistTracks = this.props.queriedPlaylist.data.tracks;
      
      let id = md5(this.props.match.params.id + queriedPlaylistTracks.offset);
      let queriedPlaylistTrackIds = queriedPlaylistTracks.items.map((trackObj) => {
        return trackObj.track.id
      })

      this.props.getTrackFeatures(id, queriedPlaylistTrackIds);
    });
  }
  
  render() {
    if (this.props.playlistTrackFeatures && !this.props.playlistTrackFeatures.isFetching) {
      let playlist = this.props.queriedPlaylist.data;
      let trackFeatures = this.props.playlistTrackFeatures.data;
      let trackTempo = trackFeatures.tempo.map((tempo, i) => { return [trackFeatures.id[i], tempo] });
      let trackTempoRA = (movingAverage(trackFeatures.tempo, 10)).map((ma, i) => { return [trackFeatures.id[i], ma]});

      console.log(trackFeatures);
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
                <a key={i} href={trackObj.track.external_urls.spotify} id={trackObj.track.id} className="flex dim items-center link lh-copy pa1 ph0-l bb b--black-10">
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
          <div className="w-70-ns w-60-m flex flex-column h-100">
            <div className="pa3 h-75">
              <dl className="mt2 dib mb1 lh-copy h-100">
                <dd className="ml0 f4 black b w-100">Tempo/BPM</dd>
                <dd className="ml0 h-100">
                  <D3Chart 
                    width="100%"
                    height="100%"
                    margin={{top: 10, right: 10, bottom: 200, left: 50}}
                    xscale={
                      d3.scaleBand()
                        .domain(trackFeatures.id)
                        .padding(.25)}
                    yscale={
                      d3.scaleLinear()
                        .domain([d3.max(trackTempo, (d) => {return d[1];}), 0])}
                    zoommethod={(scale, chartObj) => {return scale.range([0, chartObj.width].map(d => d3.event.transform.applyX(d)))}}
                    data={trackTempo}>
                    <Bars decorator={horizontalLine} />
                    <Lines data={trackTempoRA} />
                    <Axis placement='bottom' rotatedText={true}/>
                    <Axis placement='left' />
                  </D3Chart>
                </dd>
              </dl>
            </div>
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
