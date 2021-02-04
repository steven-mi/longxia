import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Menu, Typography } from 'antd';
import { GetStartedModal } from '../../components/GetStartedModal';
import { GITHUB_OAUTH_API } from '../../../constants';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { homePageActions, reducer, sliceKey } from './slice';
import { useDispatch } from 'react-redux';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors';
import { homePageSaga } from './saga';

export const HomePage = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleOnClickGitHub = event => {
    window.location.href = GITHUB_OAUTH_API;
  };

  let query = new URLSearchParams(useLocation().search);
  let history = useHistory();
  const token = query.get('token');
  useEffect(() => {
    if (token) {
      dispatch(homePageActions.getToken(token ? token : ''));
      history.push('/');
      window.location.reload();
    }
  }, [dispatch, token]);

  return (
    <>
      <GetStartedModal onClickGitHub={handleOnClickGitHub} />
    </>
  );
};
