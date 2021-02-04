import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Layout, message, Steps } from 'antd';
import { Input } from 'antd';
import { Menu } from 'antd';
import { CreateDataset } from '../CreateDataset/Loadable';
import { Datasets } from '../Datasets/Loadable';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors';
import {
  datasetsPageActions,
  reducer,
  sliceKey,
} from '../../containers/DatasetsPage/slice';
import { datasetsPageSaga } from '../../containers/DatasetsPage/saga';
import { useDispatch, useSelector } from 'react-redux';
import { selectDatasetsPage } from '../../containers/DatasetsPage/selectors';
import { useEffect } from 'react';
import axiosInstance from '../../../utils/axiosConfig';
import { DATASET_URI, PROJECT_URI } from '../../../constants';
import {
  DatasetInterface,
  ImageInterface,
  ProjectInterface,
} from '../../../types/RootState';

interface Props {}

export const CreateProjectButton = (props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: datasetsPageSaga });
  const datasetsPage = useSelector(selectDatasetsPage);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { Header, Footer } = Layout;
  const { Step } = Steps;

  const [currentStep, setCurrentStep] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [projectName, setProjectName] = React.useState('');
  const [projectType, setProjectType] = React.useState('');
  const [currentMenuItem, setCurrentMenuItem] = React.useState(
    'select_dataset',
  );
  const onCreateDataset = async () => {
    try {
      const datasetResponse = await Promise.all(
        selectedRows.map(rows => axiosInstance.get(`${DATASET_URI}/${rows}`)),
      );
      const datasets: DatasetInterface[] = datasetResponse.map(
        response => response.data,
      );
      const imageIds: number[] = datasets.flatMap(dataset => dataset.imageIds);
      const project: ProjectInterface = {
        id: -1,
        name: projectName,
        type: projectType,
        imageIds: imageIds,
      };
      const response = await axiosInstance.post(PROJECT_URI, project);
      console.log(response);
      message.success('Project created.');
    } catch (err) {
      console.log(err);
      message.error('Dataset was not created.');
    }
  };

  useEffect(() => {
    dispatch(datasetsPageActions.getDatasets());
  }, [dispatch, currentMenuItem]);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Layout>
        <Header>
          <Steps progressDot current={currentStep}>
            <Step title={'Name'} />
            <Step title={'Datasets'} />
            <Step title={'Type'} />
          </Steps>
        </Header>
        <Footer>
          <div className="steps-content">
            {currentStep === 0 && (
              <Input
                value={projectName}
                onChange={event => setProjectName(event.target.value)}
                placeholder={'Please type your project name here...'}
              />
            )}
            {currentStep === 1 && (
              <>
                <Menu
                  theme={'dark'}
                  selectedKeys={[currentMenuItem]}
                  mode="horizontal"
                  style={{ paddingBottom: 10 }}
                >
                  <Menu.Item
                    key="select_dataset"
                    onClick={() => setCurrentMenuItem('select_dataset')}
                  >
                    Select dataset
                  </Menu.Item>
                  <Menu.Item
                    key="create_dataset"
                    onClick={() => setCurrentMenuItem('create_dataset')}
                  >
                    Create dataset
                  </Menu.Item>
                </Menu>
                {currentMenuItem === 'select_dataset' ? (
                  <Datasets
                    datasets={datasetsPage.datasets}
                    onRowSelection={setSelectedRows}
                  />
                ) : (
                  <CreateDataset />
                )}
              </>
            )}
            {currentStep === 2 && (
              <>
                <Button onClick={() => setProjectType('Object Detection')}>
                  Object Detection
                </Button>
                <Button onClick={() => setProjectType('Semantic Segmentation')}>
                  Semantic Segmentation
                </Button>
              </>
            )}
          </div>
          <div className="steps-action" style={{ float: 'right' }}>
            {currentStep === 0 && (
              <Button
                disabled={projectName === ''}
                type="primary"
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {currentStep === 1 && (
              <Button
                disabled={selectedRows.length === 0}
                type="primary"
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {currentStep === 2 && (
              <Button type="primary" onClick={() => onCreateDataset()}>
                Create
              </Button>
            )}
            {currentStep > 0 && (
              <Button onClick={() => prev()}>Previous</Button>
            )}
          </div>
        </Footer>
      </Layout>
    </>
  );
};
