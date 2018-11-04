import React, { Component } from 'react';

class FixedLayout extends Component {
  render() {
    return (
      <div className="h-100">
        <nav className="fixed w-100 top-0 flex justify-between bg-white bb b--near-white">
          <a className="link fw6 black-70 dim flex items-center pa3" href="">
            AURALCORD
          </a>
        </nav>
        {this.props.yield}
        <footer className="fixed w-100 bottom-0 flex pv4 ph2 mid-gray bg-white items-center">
          <small className="f6 db tc w-100">See me on <a className="link dim" href=""><b class="ttu">Github</b></a>.</small>
        </footer>
      </div>
    )
  }
}

export default FixedLayout;
