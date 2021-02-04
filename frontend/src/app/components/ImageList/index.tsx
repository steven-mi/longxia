import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import { ImageInterface } from '../../../types/RootState';
import { Typography } from 'antd';

interface Props {
  images?: ImageInterface[];
}

export const ImageList = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { Text, Paragraph } = Typography;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: name => (
        <>
          <Text ellipsis={true}>{name}</Text>
        </>
      ),
    },
    {
      title: 'URL',
      key: 'url',
      dataIndex: 'url',
      render: url => (
        <>
          <a href={url} rel="noreferrer" target="_blank">
            <Text ellipsis={false}>{url}</Text>
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={props.images} />
    </>
  );
};
