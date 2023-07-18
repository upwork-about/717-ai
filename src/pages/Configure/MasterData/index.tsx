import React from 'react';
import { Button, Input, Popover } from 'antd';
import { PageContainer, ProCard } from '@ant-design/pro-components';

import Clauses from './Clauses';
import Customer from './Customer';
import Material from './Material';
const BalanceForm: React.FC = () => {
  return (
    <PageContainer
      fixedHeader
      header={{
        title: 'Master Data Configuration',
      }}
      tabList={[
        {
          tab: 'Clauses',
          key: '1',
          children: <Clauses />,
        },
        {
          tab: 'Customer',
          key: '2',
          children: <Customer />,
        },
        {
          tab: 'Material',
          key: '3',
          children: <Material />,
        },
      ]}
    ></PageContainer>
  );
};
export default BalanceForm;
