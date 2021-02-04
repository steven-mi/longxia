import { PageState, TokenInterface } from '../../../types/RootState';

export interface HomePageState extends PageState {
  token: TokenInterface;
}

export type ContainerState = HomePageState;
