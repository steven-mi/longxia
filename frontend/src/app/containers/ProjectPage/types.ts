import {
  ImageInterface,
  PageState,
  ProjectInterface,
} from '../../../types/RootState';

export interface ProjectPageState extends PageState {
  project?: ProjectInterface;
  datasetImages?: ImageInterface[];
}

export type ContainerState = ProjectPageState;
