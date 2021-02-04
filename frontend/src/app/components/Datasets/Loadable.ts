/**
 *
 * Asynchronously loads the component for ProjectsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Datasets = lazyLoad(
  () => import('./index'),
  module => module.Datasets,
);
