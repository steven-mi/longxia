import { ProjectsPageState } from 'app/containers/ProjectsPage/types';
import { ProjectPageState } from '../app/containers/ProjectPage/types';
import { DatasetsPageState } from '../app/containers/DatasetsPage/types';
import { DatasetPageState } from '../app/containers/DatasetPage/types';
import { HomePageState } from '../app/containers/HomePage/types';

export interface PageState {
  isLoading: boolean;
  error: string;
}

export interface DatedInterface {
  created: Date;
  latestChange: Date;
}

export interface ProjectInterface {
  id: number;
  name: string;
  // TODO: description: string;
  type: string;
  imageIds: number[];
}

export interface DatasetInterface {
  id: number;
  name: string;
  // TODO: description: string;
  imageIds: number[];
}

export interface ImageInterface {
  id: number;
  name: string;
  url: string;
  size: number;
}

export interface UserInterface {
  projectNames: string[];
  datasetNames: string[];
}

export interface TokenInterface {
  auth_token: string;
}

export interface RootState {
  projectsPage?: ProjectsPageState;
  projectPage?: ProjectPageState;
  datasetsPage?: DatasetsPageState;
  datasetPage?: DatasetPageState;
  homePage?: HomePageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
