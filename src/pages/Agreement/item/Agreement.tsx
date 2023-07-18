import React from 'react';
import { Button, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { getAgreements } from '@/services/ant-design-pro/agreement';
import { PlusOutlined } from '@ant-design/icons';
const Agreement: React.FC<{ name: string }> = ({ name }) => {
  const columns = [
    { title: 'Agreement ID', dataIndex: 'display_id', valueType: 'text' },
    { title: 'Agreement Type', dataIndex: 'agreement_type', valueType: 'text' },
    { title: 'Agreement Subtype', dataIndex: 'agreement_subtype', valueType: 'text' },
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
        let res = await getAgreements({ params: { type: name } });
        console.log(res, 'res');
        return { data: res.items as any[], success: true, total: res.length };
      }}
      columns={columns}
      rowSelection={{}}
    />
  );
};
export default Agreement;
