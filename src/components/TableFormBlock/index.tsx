import React from 'react';
import { Button, Input, Popover } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { TableFormBlockProps } from './types';
const TableFormBlock: React.FC<TableFormBlockProps> = (props) => {
  const props_ = {
    ...props,
  };
  return <ProTable<API.RuleListItem, API.PageParams> {...props_} />;
};
export default TableFormBlock;
