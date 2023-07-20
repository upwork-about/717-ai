import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { ActionType, ProDescriptions } from '@ant-design/pro-components';
import { getMasterData } from '@/services/ant-design-pro/config';
const BaseTable: React.FC<{ tab: 1 | 2 | 3; query: string }> = ({ tab, query }) => {
  const actionRef = useRef<ActionType>();
  const [columns, setColumns] = useState([]);

  return (
    <div className="wrap">
      <TableFormBlock
        actionRef={actionRef}
        columns={columns}
        search={{
          filterType: 'light',
        }}
        scroll={{ x: 2600 }}
        rowSelection={{}}
        request={async () => {
          let res = await getMasterData({
            tab,
            query,
          });
          console.log(res, 'res');

          const newColumns = res.headers.map((item: string) => ({
            title: item,
            dataIndex: item,
            valueType: 'text',
            ellipsis: true,
            colProps: { span: item === 'Prescription' ? 24 : 12 },
          }));

          setColumns(newColumns);
          const data =
            Object.values(res.items)?.map((item: any) => {
              const obj: any = {};
              item.forEach((it: any) => {
                obj[it.name] = it.value;
              });
              return obj;
            }) || [];
          console.log(data, 'data');
          return { data: data as any[], success: true, total: res.length };
        }}
      />
    </div>
  );
};
export default BaseTable;
