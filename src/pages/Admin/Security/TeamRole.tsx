import React, { useRef, useState } from 'react';
import { Button, Drawer, Empty, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { ActionType, ProDescriptions } from '@ant-design/pro-components';
import { getMasterData } from '@/services/ant-design-pro/config';
import { getUsers } from '@/services/ant-design-pro/admin';
const BaseTable: React.FC = () => {
  const actionRef = useRef<ActionType>();

  return (
    <div className="wrap">
      <Empty />
    </div>
  );
};
export default BaseTable;
