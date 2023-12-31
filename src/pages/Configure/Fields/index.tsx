import React, { useRef, useState } from 'react';
import TableFormBlock from '@/components/TableFormBlock';
import {
  getContextList,
  getDataType,
  getFields,
  getPDFMappings,
  getPDFMappingsContext,
} from '@/services/ant-design-pro/config';
import { ActionType, PageContainer, ProColumns } from '@ant-design/pro-components';
import { ALPHANUMERIC_REGEX, FORM_TYPE_DATA } from './constants';
import UpdateForm from './UpdateForm';
const BalanceForm: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.ConfigAgreementItem>[] = [
    {
      title: 'Field Name',
      valueType: 'text',
      sorter: true,
      dataIndex: 'name',
    },
    {
      title: 'Context',
      valueType: 'text',
      sorter: true,
      dataIndex: 'context',
    },
    {
      title: 'Created Date',
      valueType: 'text',
      sorter: true,
      dataIndex: 'created_date',
    },

    {
      title: 'Created By',
      valueType: 'text',
      sorter: true,
      dataIndex: 'created_by',
    },
    {
      title: 'Last Edited Date',
      valueType: 'text',
      sorter: true,
      dataIndex: 'last_edited_date',
    },
    {
      title: 'Master Data',
      valueType: 'text',
      sorter: true,
      dataIndex: 'master_data',
    },
  ];

  return (
    <PageContainer>
      <TableFormBlock
        actionRef={actionRef}
        columns={columns}
        rowSelection={{}}
        request={async () => {
          let res = await getFields();
          console.log(res, 'res');
          return { data: res as any[], success: true, total: res.length };
        }}
        actions={{
          dom: {
            editDom: <UpdateForm></UpdateForm>,
          },
        }}
      />
    </PageContainer>
  );
};
export default BalanceForm;
