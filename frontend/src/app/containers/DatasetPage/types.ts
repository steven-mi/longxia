/* --- STATE --- */
import {
  PageState,
  DatasetInterface,
  ImageInterface,
} from '../../../types/RootState';

export interface DatasetPageState extends PageState {
  dataset?: DatasetInterface;
  datasetImages?: ImageInterface[];
}

export type ContainerState = DatasetPageState;
