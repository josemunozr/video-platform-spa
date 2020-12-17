/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import React from 'react';
import helmet from 'helmet';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import boom from '@hapi/boom';
import passport from 'passport';
import serverRoutes from '../client/routers/serverRoutes';
import reducer from '../client/reducers';
import Layout from '../client/components/Layout';
import getManifest from './getManifest';

dotenv.config();

const { ENV, PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require('./utils/auth/strategies/basic');

if (ENV === 'development') {
  console.log('development config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: PORT, hot: true };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });

  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(
    helmet.permittedCrossDomainPolicies({
      permittedPolicies: 'none',
    })
  );
  app.disable('x-powered-by');
}

const sendResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="${mainStyles}" type="text/css"/>
      <title>video platform</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          '\\u003c'
        )}
      </script>
      <script src="${vendorBuild}" type="text/javascript" ></script>
      <script src="${mainBuild}" type="text/javascript" ></script>
    </body>
  </html> 
`;
};

const renderApp = async (req, res) => {
  const { token, name, email, id } = req.cookies;
  let initialState;
  try {
    let movieList = await axios({
      url: `${process.env.API_URL}/api/movies`,
      method: 'GET',
      headers: { Authorization: `bearer ${token}` },
    });
    movieList = movieList.data.data;
    initialState = {
      user: { name, email, id },
      playing: {},
      searchResult: [],
      myList: [],
      trends: movieList.filter(
        (movie) => movie.contentRating === 'PG' && movie._id
      ),
      originals: movieList.filter(
        (movie) => movie.contentRating === 'G' && movie._id
      ),
    };
  } catch (error) {
    initialState = {
      user: {},
      playing: {},
      searchResult: [],
      myList: [],
      trends: [],
      originals: [],
    };
  }

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const isLogged = initialState.user.id;
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
      </StaticRouter>
    </Provider>
  );

  res.send(sendResponse(html, preloadedState, req.hashManifest));
};

app.post('/auth/sign-in', async (req, res, next) => {
  passport.authenticate('basic', function (error, data) {
    try {
      if (error || !data) {
        return next(boom.unauthorized());
      }

      req.login(data, { session: false }, async (error) => {
        if (error) next(error);

        const { token, ...user } = data;

        res.cookie('token', token, {
          httpOnly: !(ENV === 'development'),
          secure: !(ENV === 'development'),
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post('/auth/sign-up', async (req, res, next) => {
  const { body: user } = req;
  try {
    const userData = await axios({
      url: `${process.env.API_URL}/api/auth/sign-up`,
      method: 'post',
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    res.status(201).json({
      name: req.body.name,
      email: req.body.email,
      id: userData.data.id,
    });
  } catch (error) {
    next(error);
  }
});

app.post('/user-movies', async (req, res, next) => {
  const { body } = req;
  const { id, token } = req.cookies;

  try {
    const { data, status } = await axios({
      url: `${process.env.API_URL}/api/user-movies`,
      method: 'POST',
      headers: { Authorization: `bearer ${token}` },
      data: {
        userId: id,
        movieId: body._id,
      },
    });

    if (status !== 201) {
      next(boom.badImplementation());
    }

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.get('*', renderApp);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`listen in http://localhost:${PORT}`);
});
