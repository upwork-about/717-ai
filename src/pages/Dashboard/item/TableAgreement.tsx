import React from 'react';
import { Button, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { PlusOutlined } from '@ant-design/icons';
import { getAgreements } from '@/services/ant-design-pro/agreement';
const BalanceForm: React.FC = () => {
  const columns = [
    { title: 'Agreement ID', dataIndex: 'display_id', valueType: 'text' },
    { title: 'Agreement Type', dataIndex: 'agreement_type', valueType: 'text' },
    { title: 'Agreement Subtype', dataIndex: 'agreement_subtype', valueType: 'text' },
    { title: 'Agreement Number', dataIndex: 'number', valueType: 'text' },
    { title: 'Agreement Start Date', dataIndex: 'start_date', valueType: 'text' },
    { title: 'Agreement Value', dataIndex: 'value', valueType: 'text' },
    { title: 'Customer', dataIndex: 'customer', valueType: 'text' },
    { title: 'Created At', dataIndex: 'created_at', valueType: 'text' },
    { title: 'Status', dataIndex: 'status', valueType: 'text' },
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
