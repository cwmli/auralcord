import compression from 'compression';
import express from "express";
import path from "path";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from './src/App/App';

const app = express()
          .use(compression())
          .use(express.static(path.resolve( __dirname, "./public")));

const port = process.env.PORT || 8080;

app.get('/*', (req, res) => {
  const context = { };
  const jsx = ( 
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>);
  const reactDom = renderToString(jsx);

  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( htmlTemplate( reactDom ) );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function htmlTemplate( reactDom ) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>AURALCORD</title>
          <link rel="stylesheet" type="text/css" href="index.css" />
      </head>
      
      <body>
        <div id="app" class="sans-serif">${reactDom}</div>
        <script src="bundle.js"></script>
      </body>
      </html>
  `;
}
