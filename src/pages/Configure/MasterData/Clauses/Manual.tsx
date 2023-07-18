import React, { useRef, useState } from 'react';
import { Button, Input, Popover } from 'antd';
import BaseTable from '../BaseTable';

const Manual: React.FC = () => {
  return (
    <div className="wrap">
      <BaseTable tab={1} query="?direction=asc&page=1&page_size=10"></BaseTable>
    </div>
  );
};
export default Manual;
