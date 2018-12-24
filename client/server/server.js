import compression from 'compression';
import express from "express";
import path from "path";

import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import auralcordApp from "../src/reducers";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from '../src/App/App';

const app = express()
          .use(compression())
          .use(express.static(path.resolve( __dirname, "../public")));

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const store = createStore(auralcordApp);
  const context = { };

  const jsx = ( 
    <Provider store={store}>
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    </Provider>);
  const reactDom = renderToString(jsx);
  const preloadedState = store.getState();

  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( htmlTemplate(reactDom, preloadedState) );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function htmlTemplate(reactDom, state) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <link href="https://use.fontawesome.com/releases/v5.5.0/css/svg-with-js.css" rel="stylesheet">
          <link rel="stylesheet" type="text/css" href="index.css">
          <title>AURALCORD</title>
      </head>
      
      <body>
        <div id="app" class="sans-serif">${reactDom}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="bundle.js"></script>
      </body>
      </html>
  `;
}
