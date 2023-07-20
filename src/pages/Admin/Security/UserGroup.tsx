import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { ActionType, ProDescriptions } from '@ant-design/pro-components';
import { getMasterData } from '@/services/ant-design-pro/config';
import { getUserGroups, getUsers } from '@/services/ant-design-pro/admin';
const BaseTable: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: 'User Group Name',
      dataIndex: 'name',
    },
    {
      title: 'Number of Users',
      dataIndex: 'members',
    },
    {
      title: 'User Group Description',
      dataIndex: 'description',
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
          let res = await getUserGroups();
          return { data: res as any[], success: true, total: res.length };
        }}
      />
    </div>
  );
};
export default BaseTable;
