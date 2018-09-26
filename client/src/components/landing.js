import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
        <div className="w-100 vh-100 cover bg-black-80" >
          <div className="dt w-100 h-100 center">
            <div className="dtc v-mid tc white ph3 ph4-l">
              <h1 className="f6 f2-m f-subheadline-l fw6 tc mb1">Spotlist</h1>
              <h2 className="fw1 f4 white-80">Spotify infographic profile data</h2>
              <a className="f6 link dim br2 ph3 pv2 mb2 dib no-underline bg-blue white" href="/">Link Account</a>
            </div>
          </div>
        </div> 
    )
  }
}

export default Landing;