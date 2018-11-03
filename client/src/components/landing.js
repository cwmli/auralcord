import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="absolute bg-white tc" style={{left: "50%", top: "30%", margin: "0 0 0 -226px"}}>
          <div className="dtc v-mid tc black ph3 ph4-l">
            <h1 className="f6 f2-m f-subheadline-l fw6 tc mb1">SPOTLIST</h1>
            <h2 className="fw1 f4 black-80">Spotify infographic profile data</h2>
            <Link className="f6 link dim br2 ph3 pv2 mb2 dib no-underline bg-theme-green black" to="/profile">Sign In With <FontAwesomeIcon icon={faSpotify} /></Link>
          </div>
        </div>
        <Particles 
          className="vh-100"
          params={{
            particles: {
              number: {
                "value": 80,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              color: {
                "value": "#000000"
              },
              shape: {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              opacity: {
                "value": 0.5,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              size: {
                "value": 3,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              line_linked: {
                "enable": true,
                "distance": 150,
                "color": "#8c8c8c",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              },
            "retina_detect": true
            }
          }}
        />
      </div>
    )
  }
}

export default Landing;
