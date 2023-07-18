import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, Popover, message } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { getFields } from '@/services/ant-design-pro/config';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import UpdateForm, { FormValueType } from './UpdateForm';
const BalanceForm: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.ConfigAgreementItem>();
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
    {
      title: 'Operating',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          Edit
        </a>,
      ],
    },
  ];

  const handleAdd = async (fields: API.ConfigAgreementItem) => {
    const hide = message.loading('正在添加');
    try {
      // await addRule({ ...fields });
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
      // await updateRule({
      //   name: fields.display_id,
      // });
      hide();

      message.success('Configuration is successful');
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };
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
      />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.display_id && (
          <ProDescriptions<API.ConfigAgreementItem>
            column={2}
            title={currentRow?.display_id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.display_id,
            }}
            columns={columns as ProDescriptionsItemProps<API.ConfigAgreementItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default BalanceForm;
