/**
 *
 * Asynchronously loads the component for ProjectsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DatasetPage = lazyLoad(
  () => import('./index'),
  module => module.DatasetPage,
);
