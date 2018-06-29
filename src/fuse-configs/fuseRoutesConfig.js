import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { appsConfigs } from 'main/content/apps/appsConfigs';
import { pagesConfigs } from 'main/content/pages/pagesConfigs';

const routeConfigs = [...appsConfigs, ...pagesConfigs];

export const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/apps/dashboards/analytics" />
  }
];
