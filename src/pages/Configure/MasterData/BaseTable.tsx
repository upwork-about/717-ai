import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { ActionType, ProDescriptions } from '@ant-design/pro-components';
import { getMasterData } from '@/services/ant-design-pro/config';
const BaseTable: React.FC<{ tab: 1 | 2 | 3; query: string }> = ({ tab, query }) => {
  const actionRef = useRef<ActionType>();
  const [columns, setColumns] = useState([]);
  const [currentRow, setCurrentRow] = useState<any>();
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="wrap">
      <TableFormBlock
        actionRef={actionRef}
        columns={columns}
        scroll={{ x: 1800 }}
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
            width: 150,
          }));
          newColumns.push({
            title: 'Actions',
            fixed: 'right',
            render: (_: string, record: Record<string, any>) => [
              <a
                key="config"
                onClick={() => {
                  console.log(record, 'record');
                  setShowDetail(true);
                  setCurrentRow(record);
                }}
              >
                View
              </a>,
            ],
          });
          setColumns(newColumns);
          const data = Object.values(res.items).map((item: any) => {
            const obj: any = {};
            item.forEach((it: any) => {
              obj[it.name] = it.value;
            });
            return obj;
          });
          return { data: data as any[], success: true, total: res.length };
        }}
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
export default BaseTable;
