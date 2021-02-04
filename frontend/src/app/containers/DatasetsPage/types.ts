/* --- STATE --- */
import { PageState, DatasetInterface } from '../../../types/RootState';

export interface DatasetsPageState extends PageState {
  datasets: DatasetInterface[];
}

export type ContainerState = DatasetsPageState;
