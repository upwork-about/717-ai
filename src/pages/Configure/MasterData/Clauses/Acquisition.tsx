import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { ActionType, ProDescriptions } from '@ant-design/pro-components';
import { getMasterData } from '@/services/ant-design-pro/config';
import BaseTable from '../BaseTable';
const Acquisition: React.FC = () => {
  return (
    <div className="wrap">
      <BaseTable
        tab={1}
        query="?direction=asc&source=acquisition.gov&page=1&page_size=10"
      ></BaseTable>
    </div>
  );
};
export default Acquisition;
