import React, { Component } from 'react';

class DefaultLayout extends Component {
  render() {
    return (
      <div className="flex flex-column">
        <nav className="bg-white b--white-10 bb b--black-10">
          <a className="link fw6 black-70 dim flex items-center pa3" href="">
            AURALCORD
          </a>
        </nav>
        {this.props.yield}
        <footer className="pv4 ph2 mid-gray bg-white">
          <small className="f6 db tc w-100">See me on <a className="link dim" href=""><b className="ttu">Github</b></a>.</small>
        </footer>
      </div>
    )
  }
}

export default DefaultLayout;
