import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Input, Upload, Typography, message, Button, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { Row, Col } from 'antd';
import { RcCustomRequestOptions } from 'antd/lib/upload/interface';
import { DATASET_URI, FILE_TYPES, IMAGE_URI } from '../../../constants';
import axiosInstance from '../../../utils/axiosConfig';
import { DatasetInterface } from '../../../types/RootState';

interface Props {}

export const CreateDataset = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { Dragger } = Upload;
  const { Title, Paragraph } = Typography;

  const [datasetName, setDatasetName] = React.useState('');
  const [datasetImageIds, setDatasetImageIds] = React.useState<any>([]);

  const onChange = info => {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  async function handleImageUpload(options: RcCustomRequestOptions) {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    fmData.append('file', file);

    const onUploadProgress = event => {
      onProgress({ percent: (event.loaded / event.total) * 100 }, file);
    };
    try {
      const response = await axiosInstance.post(IMAGE_URI, fmData, {
        onUploadProgress,
      });

      const locationArr: string = response.headers.location.split('/');
      datasetImageIds.push(locationArr[locationArr.length - 1]);
      onSuccess({ response: 'Upload successful' }, file);
    } catch (err) {
      onError(new Error('Upload failed'), file);
    }
  }

  async function handleDatasetCreation() {
    try {
      const dataset: DatasetInterface = {
        id: -1,
        imageIds: datasetImageIds,
        name: datasetName,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axiosInstance.post(DATASET_URI, dataset);
      message.success('Dataset created.');

      setDatasetName('');
      setDatasetImageIds([]);
    } catch (err) {
      message.error('Dataset was not created.');
    }
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={3}>Manual upload</Title>
          <div style={{ marginBottom: 10 }}>
            <Title level={5}>Dataset name:</Title>
            <Input
              placeholder={'Please type your dataset name here...'}
              onChange={event => setDatasetName(event.target.value)}
              value={datasetName}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <Title level={5}>Dataset images:</Title>
            <Dragger
              onChange={onChange}
              customRequest={handleImageUpload}
              multiple={true}
              style={{ backgroundColor: ' #F5F9FF' }}
              accept={FILE_TYPES}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag PNG or JPEG files to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data, band files or any other copyrighted
                content.
              </p>
            </Dragger>
          </div>

          <div>
            <Button
              type="primary"
              onClick={handleDatasetCreation}
              disabled={
                datasetName.length === 0 || datasetImageIds.length === 0
              }
            >
              Create
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <Title level={3}>Python API</Title>
          <div style={{ marginBottom: 10 }}>
            <Title level={5}>API Token:</Title>
            <Input.Password value={'1231312'} />
          </div>
          <div>
            <Title level={5}>API Usage:</Title>
            <Card>
              <Paragraph>
                pip install longxia-api <br />
                import dataset from longxia <br />
                image_paths = [a list with paths to your images] <br />
                token = your API token as string
                <br />
                dataset.builder().token(token) <br />
                .image_paths(image_paths).build()
              </Paragraph>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
};
