import { BetaSchemaForm, ProColumns, TableDropdown } from '@ant-design/pro-components';
import { TableFormBlockProps } from './types';
import { ReactNode } from 'react';
import { notification } from 'antd';

export const getColumns = (props: TableFormBlockProps) => {
  if (props.actions === false) {
    return props.columns;
  }

  const { createSchema, createRequest, updateRequest, deleteRequest, duplicateRequest } =
    props.operation || {};
  let actions = props.actions?.btnList ?? ['view', 'edit', 'duplicate', 'delete'];

  const isStringTitle = typeof props.headerTitle === 'string';

  const columnsActions: ProColumns = {
    title: 'Actions',
    fixed: 'right',
    dataIndex: 'options',
    valueType: 'option',
    render: (_: ReactNode, record: Record<string, any>) => {
      if ((props.actions as any)?.renderBefore) {
        actions = (props.actions as any)?.renderBefore(record);
      }
      let stragety = {
        view: (
          <BetaSchemaForm<any>
            key="view"
            readonly
            title={(isStringTitle ? 'View ' + props.headerTitle : props.headerTitle) as any}
            trigger={<a>View</a>}
            initialValues={record}
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
          />
        ),
        edit: (
          <BetaSchemaForm<any>
            key="edit"
            trigger={<a>Edit</a>}
            initialValues={record}
            title={(isStringTitle ? 'Edit ' + props.headerTitle : props.headerTitle) as any}
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
          />
        ),
        duplicate: (
          <BetaSchemaForm<any>
            key="edit"
            trigger={<a>Duplicate</a>}
            initialValues={record}
            title={(isStringTitle ? 'Duplicate ' + props.headerTitle : props.headerTitle) as any}
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
          />
        ),
        delete: (
          <TableDropdown
            key="actionGroup"
            onSelect={async (value) => {
              console.log(value, 'values');
              if (value === 'delete') {
                let res = await deleteRequest?.(record);
                if (res) {
                  (props.actionRef as any)?.current?.reload();
                }
              }
            }}
            menus={[{ key: 'delete', name: '删除' }]}
          />
        ),
      };
      return actions?.map((item) => stragety[item]);
    },
  };
  return props.columns ? [...props.columns, columnsActions] : undefined;
};
