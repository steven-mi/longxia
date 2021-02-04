/**
 *
 * Asynchronously loads the component for ProjectsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CreateProjectButton = lazyLoad(
  () => import('./index'),
  module => module.CreateProjectButton,
);
