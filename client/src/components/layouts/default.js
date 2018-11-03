import React, { Component } from 'react';

class DefaultLayout extends Component {
  render() {
    return (
      <div className="flex flex-column h-100">
        <nav className="flex justify-between bg-white b--white-10 bb b--black-10">
          <a className="link black-70 dim flex items-center pa3" href="">
            ICON
          </a>
          <div className="pa3 flex items-center">
            <a className="f6 dib black-60 bg-animate hover-black no-underline pv2 ph4" href="#0">Sign In</a>
          </div>
        </nav>
        {this.props.yield}
        <footer className="flex pv4 ph2 mid-gray bg-white items-center">
          <small className="f6 db tc w-100">See me on <a className="link dim" href=""><b class="ttu">Github</b></a>.</small>
        </footer>
      </div>
    )
  }
}

export default DefaultLayout;
