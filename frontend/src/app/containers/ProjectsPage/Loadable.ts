/**
 *
 * Asynchronously loads the component for ProjectsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ProjectsPage = lazyLoad(
  () => import('./index'),
  module => module.ProjectsPage,
);
