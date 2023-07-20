import React, { ReactNode, useState } from 'react';
import { BetaSchemaForm, ProTable } from '@ant-design/pro-components';
import { TableFormBlockProps } from './types';
import { getColumns } from './utils';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const TableFormBlock: React.FC<TableFormBlockProps> = (props) => {
  const isStringTitle = typeof props.headerTitle === 'string';
  const props_ = {
    ...props,
    columns: getColumns(props),
    toolBarRender: () => [
      <BetaSchemaForm<any>
        key="create"
        title={(isStringTitle ? 'Create ' + props.headerTitle : props.headerTitle) as any}
        trigger={
          <Button type="primary" key="primary" onClick={() => {}}>
            <PlusOutlined /> New
          </Button>
        }
        layoutType={'ModalForm'}
        steps={[
          {
            title: 'ProComponent',
          },
        ]}
        rowProps={{
          gutter: [16, 16],
        }}
        colProps={{
          span: 12,
        }}
        grid={true}
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={props.columns as any}
      />,
    ],
  };

  return (
    <div>
      <ProTable<any> {...props_} />
    </div>
  );
};
export default TableFormBlock;
