import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { ActionType, ProDescriptions } from '@ant-design/pro-components';
import { getMasterData } from '@/services/ant-design-pro/config';
import { getUsers } from '@/services/ant-design-pro/admin';
const BaseTable: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
    },
    {
      title: 'last Name',
      dataIndex: 'lastname',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
    },

    {
      title: 'User Group',
      dataIndex: 'group',
    },

    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
  ];

  return (
    <div className="wrap">
      <TableFormBlock
        actionRef={actionRef}
        columns={columns}
        search={{
          filterType: 'light',
        }}
        rowSelection={{}}
        request={async () => {
          let res = await getUsers();
          return { data: res as any[], success: true, total: res.length };
        }}
      />
    </div>
  );
};
export default BaseTable;
