import React from 'react';
import { Button, Input, Popover } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import User from './User';
import UserGroup from './UserGroup';
import TeamRole from './TeamRole';
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
      <ProCard.TabPane key="tab1" tab="Users">
        <User />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="User Groups">
        <UserGroup />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab3" tab="Team Roles">
        <TeamRole />
      </ProCard.TabPane>
    </ProCard>
  );
};
export default BalanceForm;
