import React, { useRef, useState } from 'react';
import { Button, Drawer, Empty, Input, Popover } from 'antd';
import { ActionType, ProDescriptions } from '@ant-design/pro-components';

const BaseTable: React.FC = () => {
  const actionRef = useRef<ActionType>();

  return (
    <div className="wrap">
      <Empty />
    </div>
  );
};
export default BaseTable;
