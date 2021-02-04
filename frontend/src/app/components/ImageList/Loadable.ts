/**
 *
 * Asynchronously loads the component for ProjectsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ImageList = lazyLoad(
  () => import('./index'),
  module => module.ImageList,
);
