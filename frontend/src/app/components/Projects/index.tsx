import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectInterface } from '../../../types/RootState';
import { Table, Tag, Space, Button } from 'antd';

interface Props {
  projects: ProjectInterface[];
  onClick: (projectId: string) => void;
}

export const Projects = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: 'Pending',
      key: 'imageIds',
      dataIndex: 'imageIds',
      render: imageIds => (imageIds ? imageIds.length : ''),
    },
    {
      title: 'Labeled',
      key: 'labeledImages',
      dataIndex: 'labeledImages',
      render: labeledImages => (labeledImages ? labeledImages.length : ''),
    },

    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: projectId => (
        <>
          <Button onClick={() => props.onClick(projectId)} type="primary">
            open
          </Button>
        </>
      ),
    },
  ];

  // @ts-ignore
  return (
    <>
      <Table columns={columns} dataSource={props.projects} />
    </>
  );
};
