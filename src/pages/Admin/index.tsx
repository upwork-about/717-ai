import React from 'react';
import { Button, Input, Popover } from 'antd';
import { PageContainer, ProCard } from '@ant-design/pro-components';

import Security from './Security';
import Notification from './Notification';
import DataImport from './DataImport';
import DataRepository from './DataRepository';
import Integrations from './Integrations';
import ContentNetwork from './ContentNetwork';
const BalanceForm: React.FC = () => {
  return (
    <PageContainer
      fixedHeader
      header={{
        title: 'Master Data Configuration',
      }}
      tabList={[
        {
          tab: 'Security',
          key: 'security',
          children: <Security />,
        },
        {
          tab: 'Notifications',
          key: 'notifications',
          children: <Notification />,
        },
        {
          tab: 'Data Import',
          key: 'data-import',
          children: <DataImport />,
        },
        {
          tab: 'Data Repository',
          key: 'data-repository',
          children: <DataRepository />,
        },
        {
          tab: 'Integrations',
          key: 'integrations',
          children: <Integrations />,
        },
        {
          tab: 'Content Network',
          key: 'content-network',
          children: <ContentNetwork />,
        },
      ]}
    ></PageContainer>
  );
};
export default BalanceForm;
