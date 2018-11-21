import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="w-100 vh-100 cover bg-black-80" >
        <div className="dt w-100 h-100 center">
          <div className="dtc v-mid tc white ph3 ph4-l">
            <h1 className="f6 f2-m f-subheadline-l fw6 tc mb1">Loading</h1>
          </div>
        </div>
      </div> 
    )
  }
}

export default Loading;