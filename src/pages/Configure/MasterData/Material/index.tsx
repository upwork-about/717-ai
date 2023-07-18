import React from 'react';
import { Button, Input, Popover } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import Sap from './Sap';
import Manual from './Manual';
const BalanceForm: React.FC = () => {
  return (
    <ProCard
      tabs={{
        type: 'card',
      }}
      direction="column"
      ghost
      gutter={[0, 16]}
    >
      <ProCard.TabPane key="tab1" tab="Sap">
        <Sap />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="Manual">
        <Manual />
      </ProCard.TabPane>
    </ProCard>
  );
};
export default BalanceForm;
