import React, { useRef } from 'react';
import { Button, Input, Popover } from 'antd';
import {
  getAgreementsConfigDetailGeneral,
  getConfigFields,
} from '@/services/ant-design-pro/config';
import TableFormBlock from '@/components/TableFormBlock';
import { ActionType } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
const AgreementDetail: React.FC<{ data: any }> = ({ data }) => {
  const params = useParams();
  const id = params.id as any;
  const actionRef = useRef<ActionType>();
  const columns = [
    {
      title: 'Version Number',
      sorter: true,
      dataIndex: 'version',
    },
    {
      title: 'Updated Date',
      sorter: true,
      dataIndex: 'creation_datetime',
    },
    {
      title: 'Created By',
      sorter: true,
      dataIndex: 'created_by',
    },
  ];
  return (
    <TableFormBlock
      actions={false}
      actionRef={actionRef}
      columns={columns}
      search={{
        filterType: 'light',
      }}
      request={async () => {
        let res = await getAgreementsConfigDetailGeneral(id);

        console.log(res, 'res');

        return {
          data: res.data.versions,
        };
      }}
    />
  );
};
export default AgreementDetail;
