import React from 'react';
import { Button, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { PlusOutlined } from '@ant-design/icons';
import { getAgreements } from '@/services/ant-design-pro/agreement';
const BalanceForm: React.FC = () => {
  const columns = [
    { title: 'Agreement ID', dataIndex: 'Agreement ID', valueType: 'text' },
    { title: 'Agreement Type', dataIndex: 'Agreement Type', valueType: 'text' },
    { title: 'Agreement Subtype', dataIndex: 'Agreement Subtype', valueType: 'text' },
    { title: 'Agreement Number', dataIndex: 'Agreement Number', valueType: 'text' },
    { title: 'Agreement Start Date', dataIndex: 'Agreement Start Date', valueType: 'text' },
    { title: 'Agreement Value', dataIndex: 'Agreement Value', valueType: 'text' },
    { title: 'Customer', dataIndex: 'Customer', valueType: 'text' },
    { title: 'Created At', dataIndex: 'Created At', valueType: 'text' },
    { title: 'Status', dataIndex: 'Status', valueType: 'text' },
  ];
  return (
    <TableFormBlock
      rowKey="id"
      search={{
        labelWidth: 120,
        filterType: 'light',
      }}
      scroll={{ x: true }}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={() => {}}>
          <PlusOutlined /> New
        </Button>,
      ]}
      request={async () => {
        let res = await getAgreements();
        console.log(res, 'res');
        return { data: res.items as any[], success: true, total: res.length };
      }}
      columns={columns}
      rowSelection={{}}
    />
  );
};
export default BalanceForm;
