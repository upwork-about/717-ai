import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Drawer, Input, Tag, message, notification } from 'antd';
import React, { ReactNode, useRef, useState } from 'react';
import {
  createConfigAgreement,
  deleteConfigAgreement,
  getAgreementsConfigDetail,
  getConfigAgreement,
  getFormType,
} from '@/services/ant-design-pro/config';
import TableFormBlock from '@/components/TableFormBlock';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { data, error, loading } = useRequest(async () => {
    let res = await getAgreementsConfigDetail();
    actionRef.current?.reload();
    return { data: res };
  });

  const columns: ProColumns<API.ConfigAgreementItem>[] = [
    {
      title: 'Configuration ID',
      dataIndex: 'display_id',
      tip: 'The rule name is the unique key',
      valueType: 'textarea',
    },
    {
      title: 'Type',
      dataIndex: 'agreement_type',
      valueType: 'text',
    },
    {
      title: 'Subtype',
      dataIndex: 'agreement_subtype',
      valueType: 'text',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      valueType: 'dateTime',
    },
    {
      title: 'Last Edited Date',
      sorter: true,
      dataIndex: 'last_edited_date',
      valueType: 'dateTime',
    },
    {
      title: 'Last Edited By',
      dataIndex: 'last_edited_by',
      valueType: 'text',
    },
    {
      title: 'Created At',
      dataIndex: 'creation_datetime',
      valueType: 'dateTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: ReactNode, record: Record<string, any>) => {
        const color = text === 'Draft' ? 'red' : 'blue';

        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  const createSchema = [
    {
      title: 'Agreement Type',
      dataIndex: 'agreement_type',
      valueType: 'select',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },

      fieldProps: {
        options: data?.types.map((item: any) => ({
          label: item?.name,
          value: item?.id,
        })),
      },
    },
    {
      title: 'Agreement Subtype',
      dataIndex: 'agreement_subtype',
      valueType: 'select',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      fieldProps: {
        options: (
          data?.types
            ?.map(({ subtypes }: any) => subtypes)
            .flat(1)
            .filter(Boolean) || []
        ).map((item: any) => ({ label: item?.name, value: item?.id })),
      },
    },
    {
      title: 'Form Type',
      dataIndex: 'form_types',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
      },
      request: async () => {
        let res = await getFormType();
        if (res) {
          return res?.map((item: string) => {
            return {
              label: item,
              value: item,
            };
          });
        }
        return [];
      },
    },
    {
      title: 'Add Step',
      dataIndex: 'steps',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
        options: data?.steps.map((item: any) => ({ label: item.name, value: item.id })),
      },
    },
  ];
  return (
    <PageContainer>
      <TableFormBlock
        actions={{
          renderBefore: (record: Record<string, any>) => {
            if (record.status === 'Draft') {
              return ['view', 'edit', 'duplicate', 'delete'];
            } else {
              return ['view', 'edit', 'duplicate'];
            }
          },
        }}
        headerTitle={'Enquiry form'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => {}}>
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async () => {
          let res = await getConfigAgreement();
          console.log(res, 'res');
          return { data: res as any[], success: true, total: res.length };
        }}
        operation={{
          createSchema: createSchema as any,
          createRequest: async (values) => {
            let res = await createConfigAgreement({ data: values });
            return res;
          },
          deleteRequest: async (record) => {
            let res = await deleteConfigAgreement(record.id);
            if (res.status === 'success') {
              notification.success({
                message: res.message,
              });
            }
            return res;
          },
        }}
        columns={columns}
        rowSelection={{}}
      />
    </PageContainer>
  );
};

export default TableList;
