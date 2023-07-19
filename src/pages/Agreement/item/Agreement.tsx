import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { getAgreements } from '@/services/ant-design-pro/agreement';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  TableDropdown,
} from '@ant-design/pro-components';
const Agreement: React.FC<{ name: string }> = ({ name }) => {
  const actionRef = useRef<ActionType>(null);
  const [currentRow, setCurrentRow] = useState<any>();
  const [showDetail, setShowDetail] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const columns = [
    { title: 'Agreement ID', dataIndex: 'display_id', valueType: 'text' },
    { title: 'Agreement Type', dataIndex: 'agreement_type', valueType: 'text' },
    { title: 'Agreement Subtype', dataIndex: 'agreement_subtype', valueType: 'text' },
    { title: 'Created At', dataIndex: 'created_at', valueType: 'text' },
    { title: 'Status', dataIndex: 'status', valueType: 'text' },
    {
      title: 'Actions',
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: string, record: Record<string, any>) => [
        <a
          key="view"
          onClick={() => {
            console.log(record, 'record');
            setShowDetail(true);
            setCurrentRow(record);
          }}
        >
          View
        </a>,
        <a
          key="duplicate"
          onClick={() => {
            console.log(record, 'record');
            setShowCreate(true);
          }}
        >
          Duplicate
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => actionRef.current?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];
  return (
    <div>
      <TableFormBlock
        actionRef={actionRef}
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
      <ModalForm
        title={'New rule'}
        width="400px"
        open={showCreate}
        onOpenChange={setShowCreate}
        initialValues={currentRow}
        onFinish={async (value) => {
          console.log(value, 'value');
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Rule name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow && (
          <ProDescriptions<any>
            column={2}
            title={currentRow?.display_id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.display_id,
            }}
            columns={columns.map((item: any) => {
              if (item.dataIndex === 'Prescription') {
                return { ...item, ellipsis: false, span: 2 };
              }
              return { ...item, ellipsis: false };
            })}
          />
        )}
      </Drawer>
    </div>
  );
};
export default Agreement;
