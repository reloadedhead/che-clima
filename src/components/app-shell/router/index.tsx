import { CircularProgress } from '@material-ui/core';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CityWeather = lazy(() => import('../../../screens/city'));

const ContentRouter = () => (
  <Suspense fallback={<CircularProgress size={32} />}>
    <Switch>
      <Route path="/" component={CityWeather} />
      <Redirect to="/" />
    </Switch>
  </Suspense>
);

export default ContentRouter;
