/**
 *
 * Asynchronously loads the component for ProjectsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DatasetsPage = lazyLoad(
  () => import('./index'),
  module => module.DatasetsPage,
);
