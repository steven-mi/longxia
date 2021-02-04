export const FRONTEND_URL = process.env.REACT_APP_URL
  ? process.env.REACT_APP_URL
  : 'http://localhost:3000';

export const BACKEND_API: string = process.env.REACT_APP_BACKEND_API
  ? process.env.REACT_APP_BACKEND_API
  : 'http://localhost:8080';

export const FILE_TYPES: string = '.png,.jpeg,.jpg';

export const GITHUB_OAUTH_API: string =
  BACKEND_API + '/oauth2/authorize/github';

export const IMAGE_URI: string = '/datasetImages';
export const DATASET_URI: string = '/datasets';
export const PROJECT_URI: string = '/projects';
