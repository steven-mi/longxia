/**
 *
 * Asynchronously loads the component for ProjectsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CreateDataset = lazyLoad(
  () => import('./index'),
  module => module.CreateDataset,
);
