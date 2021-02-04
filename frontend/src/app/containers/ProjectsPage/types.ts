/* --- STATE --- */
import { PageState, ProjectInterface } from '../../../types/RootState';

export interface ProjectsPageState extends PageState {
  projects: ProjectInterface[];
}

export type ContainerState = ProjectsPageState;
