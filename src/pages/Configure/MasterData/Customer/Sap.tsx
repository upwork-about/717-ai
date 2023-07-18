import React, { useRef, useState } from 'react';
import { Button, Input, Popover } from 'antd';
import TableFormBlock from '@/components/TableFormBlock';
import { ActionType } from '@ant-design/pro-components';
import { getMasterData } from '@/services/ant-design-pro/config';
import BaseTable from '../BaseTable';
const Acquisition: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [columns, setColumns] = useState();
  return (
    <div className="wrap">
      <BaseTable tab={2} query="?direction=asc&source=sap&page=1&page_size=10"></BaseTable>
    </div>
  );
};
export default Acquisition;
