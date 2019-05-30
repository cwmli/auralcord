import React, { Component } from 'react';

class Seeder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Flow related state
      flow: 1,
      flowOptions: [],
      moreContent: false,

      // Seeding query
      seed_artists: [],
      seed_genres: [],
      seed_tracks: [],

      limit: 5,
      // see https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
      target: {},
      target_min: {},
      target_max: {}
    };

    this.handleFlowOption = this.handleFlowOption.bind(this);
    this.handleFlow = this.handleFlow.bind(this);
    this.recommendationFlow = this.recommendationFlow.bind(this);
  }

  handleFlowOption(e) {
    var name = e.target.name;
    if (!this.state.flowOptions.includes(name)) {
      this.setState((prev) => {
        prev.flowOptions.push(name);
        return {flowOptions: prev.flowOptions};
      });
    } else {
      let index = this.state.flowOptions.indexOf(name);
      this.setState((prev) => {
        prev.flowOptions.splice(index, 1);
        return {flowOptions: prev.flowOptions};
      });
    }
  }

  handleFlow(index) {
    this.setState(prev => ({flow: prev.flow + index}));
  }

  recommendationFlow(index) {
    switch(index) {
      case 1:
        return (
          <a className="f5 lh-copy b--gradient-2 link pointer dim br4 ph3 pv2 mb2 dib white shadow-4"
             onClick={() => this.handleFlow(1)}>
              Song Recommendations
          </a>
        );
      case 2:
        let choices = ['My playlists', 'My recently played', 'My top songs', 'My top artists'];
        let extendedChoices = ['Specific songs', 'Specific genres', 'Specific artists'];

        choices = this.state.moreContent ? extendedChoices : choices;

        return (
          <div>
            <h3 className="tc">Find me something similar to...</h3>
            <div className="flex items-center justify-center flex-row">
              { this.state.moreContent && 
                <a className="f5 lh-copy mh1 b--gradient-2 link pointer dim br4 ph3 pv2 mb2 dib white shadow-4"
                  onClick={() => this.setState({moreContent: false})}>
                  Back
                </a>
              }
              {
                choices.map((t, i) => {
                  return (
                    <a className={`${this.state.flowOptions.includes(t) ? "bg-near-white" : ""} 
                        f5 lh-copy mh1 link pointer dim br4 ph3 pv2 mb2 dib near-black shadow-4`}
                       key={i}
                       name={t}
                       onClick={(e) => this.handleFlowOption(e)}>
                      {t}
                    </a>
                  );
                })
              }
              { !this.state.moreContent && 
                <a className="f5 lh-copy mh1 b--gradient-2 link pointer dim br4 ph3 pv2 mb2 dib white shadow-4"
                    onClick={() => this.setState({moreContent: true})}>
                    More
                </a>
              }
            </div>
          </div>
        );
      default:
        return (<div>DONE</div>)
    }
  }

  render() {
    return (
      <div className="flex-auto">
        <div className="pv3 ph5 w-100">
          <div className="flex items-center justify-center flex-column">
            {this.recommendationFlow(this.state.flow)}
          </div>
        </div>
      </div>
    )
  }
}

export default Seeder;