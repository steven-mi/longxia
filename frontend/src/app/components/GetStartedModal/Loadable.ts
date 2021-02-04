/**
 *
 * Asynchronously loads the component for ProjectsPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const GetStartedModal = lazyLoad(
  () => import('./index'),
  module => module.GetStartedModal,
);
