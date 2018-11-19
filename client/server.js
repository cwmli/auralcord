import compression from 'compression';
import express from "express";
import path from "path";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import stats from './public/loadable-bundleinfo.json';
import App from './src/App/App';

const app = express()
          .use(compression())
          .use(express.static(path.resolve( __dirname, "./public")));

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  let modules = [];
  const context = { };

  const jsx = ( 
    <StaticRouter context={context} location={req.url}>
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <App />
      </Loadable.Capture>
    </StaticRouter>);
  const reactDom = renderToString(jsx);

  let bundles = getBundles(stats, modules);
  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( htmlTemplate(reactDom, bundles) );
});

Loadable.preloadAll().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
})

function htmlTemplate(reactDom, bundles) {
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
        ${bundles.map(bundle => {
          return `<script src="${bundle.file}"></script>`
        }).join('\n')}
        <script src="bundle.js"></script>
      </body>
      </html>
  `;
}
