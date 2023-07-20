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
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import { getConfigAgreement } from '@/services/ant-design-pro/config';
import TableFormBlock from '@/components/TableFormBlock';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

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
      valueType: 'text',
    },
  ];

  return (
    <PageContainer>
      <TableFormBlock
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
        columns={columns}
        rowSelection={{}}
      />
    </PageContainer>
  );
};

export default TableList;
