import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { DatasetInterface } from '../../../types/RootState';
import { Table, Button } from 'antd';

interface Props {
  datasets: DatasetInterface[];
  onClick?: (datasetId: string) => void;
  onRowSelection?: (selectedRowsKeys: any) => void;
  size?: string;
}

export const Datasets = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '#Samples',
      key: 'imageIds',
      dataIndex: 'imageIds',
      render: imageIds => <>{imageIds.length}</>,
    },
    props.onClick
      ? {
          title: '',
          key: 'id',
          dataIndex: 'id',
          render: id => (
            <>
              <Button
                onClick={() =>
                  // @ts-ignore
                  props.onClick(id)
                }
                type="primary"
              >
                open
              </Button>
            </>
          ),
        }
      : {},
  ];

  const rowSelection = props.onRowSelection
    ? {
        onChange: (selectedRowKeys, selectedRows) => {
          /*          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows,
          );*/
          // @ts-ignore cannot be undefined
          props.onRowSelection(selectedRowKeys);
        },
      }
    : undefined;

  return (
    <>
      <Table
        rowKey={record => record.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props.datasets}
      />
    </>
  );
};
